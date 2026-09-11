"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  seedMenu,
  categoryImages,
  CATEGORIES,
  type Category,
  type CategoryImage,
  type Dish,
  type MenuState,
} from "@/lib/menu";

/**
 * Open demo backend — no login, nothing persisted.
 *
 * Every control works against a draft held in this component only: a visitor can
 * type, add, reorder, delete, and swap the menu photography, see the result
 * immediately, and refresh to get the sample data back. Nothing is written to
 * storage and the public menu page reads `seedMenu` / `categoryImages` directly,
 * so the live site can't be changed from here. Each action also raises a toast
 * saying so.
 */

const uid = () => "d" + Math.random().toString(36).slice(2, 8);

export function AdminApp() {
  const [menu, setMenu] = useState<MenuState>(seedMenu);
  const [images, setImages] = useState<Record<Category, CategoryImage[]>>(() =>
    JSON.parse(JSON.stringify(categoryImages)),
  );
  const [filter, setFilter] = useState<Category | "All">("All");
  const [toast, setToast] = useState<string | null>(null);
  // the dish just added: scrolled to, focused, and ringed for a moment
  const [freshId, setFreshId] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  // object URLs made for uploaded photos, revoked when the page goes away
  const objectUrls = useRef<string[]>([]);

  const notify = useCallback((message = "Demo only, changes aren't saved.") => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  /* A new dish is inserted in the middle of a long list, so without this it
     lands off screen and the button looks broken. */
  useEffect(() => {
    if (!freshId) return;
    const row = document.querySelector<HTMLElement>(`[data-dish="${freshId}"]`);
    if (row) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      row.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      const input = row.querySelector("input");
      input?.focus();
      input?.select();
    }
    const t = window.setTimeout(() => setFreshId(null), 2200);
    return () => window.clearTimeout(t);
  }, [freshId]);

  const patchDish = (id: string, patch: Partial<Dish>) =>
    setMenu((m) => ({
      ...m,
      dishes: m.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));

  function addDish() {
    const category: Category = filter === "All" ? "Bites" : filter;
    const dish: Dish = {
      id: uid(),
      category,
      name: "New dish",
      price: "",
      description: "Describe what it is and how the fire cooked it.",
    };
    setMenu((m) => {
      // drop it in after the last dish of its own category rather than at the
      // very bottom of the list, where it would sit under another section
      const dishes = [...m.dishes];
      let at = -1;
      dishes.forEach((d, i) => {
        if (d.category === category) at = i;
      });
      dishes.splice(at + 1, 0, dish);
      return { ...m, dishes };
    });
    setFreshId(dish.id);
    notify(`Dish added under ${category}. Demo only, changes aren't saved.`);
  }

  function removeDish(id: string, name: string) {
    setMenu((m) => ({ ...m, dishes: m.dishes.filter((d) => d.id !== id) }));
    notify(`“${name}” removed from the draft. Demo only, changes aren't saved.`);
  }

  // reorders within the dish's own category so the visible tab list moves as expected
  function move(id: string, dir: -1 | 1) {
    setMenu((m) => {
      const cat = m.dishes.find((d) => d.id === id)?.category;
      if (!cat) return m;
      const ids = m.dishes.filter((d) => d.category === cat).map((d) => d.id);
      const i = ids.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= ids.length) return m;
      [ids[i], ids[j]] = [ids[j], ids[i]];
      const byId = new Map(m.dishes.map((d) => [d.id, d]));
      let cursor = 0;
      return {
        ...m,
        dishes: m.dishes.map((d) => (d.category === cat ? byId.get(ids[cursor++])! : d)),
      };
    });
    notify();
  }

  /* ---- photography ---- */

  function patchPhoto(cat: Category, index: number, patch: Partial<CategoryImage>) {
    setImages((prev) => ({
      ...prev,
      [cat]: prev[cat].map((img, i) => (i === index ? { ...img, ...patch } : img)),
    }));
  }

  function removePhoto(cat: Category, index: number) {
    setImages((prev) => ({ ...prev, [cat]: prev[cat].filter((_, i) => i !== index) }));
    notify(`Photo removed from ${cat}. Demo only, changes aren't saved.`);
  }

  function movePhoto(cat: Category, index: number, dir: -1 | 1) {
    setImages((prev) => {
      const list = [...prev[cat]];
      const j = index + dir;
      if (j < 0 || j >= list.length) return prev;
      [list[index], list[j]] = [list[j], list[index]];
      return { ...prev, [cat]: list };
    });
    notify();
  }

  function uploadPhoto(cat: Category, files: FileList | null) {
    if (!files || !files.length) return;
    const added: CategoryImage[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      objectUrls.current.push(url);
      added.push({ src: url, alt: file.name.replace(/\.[a-z0-9]+$/i, "") });
    });
    if (!added.length) {
      notify("That file wasn't an image.");
      return;
    }
    setImages((prev) => ({ ...prev, [cat]: [...prev[cat], ...added] }));
    notify(
      `${added.length === 1 ? "Photo" : `${added.length} photos`} added to ${cat}. Demo only, changes aren't saved.`,
    );
  }

  const visible = menu.dishes.filter((d) => filter === "All" || d.category === filter);
  const shownCategories = filter === "All" ? CATEGORIES : [filter];
  const photoCount = CATEGORIES.reduce((n, c) => n + images[c].length, 0);

  return (
    <div className="admin__wrap">
      <header className="admin__top">
        <div>
          <strong>Ferrant CMS</strong>
          <span className="admin__crumb">Menu</span>
        </div>
        <div className="admin__topact">
          <Link href="/menu" target="_blank" className="admin__link">
            View menu page ↗
          </Link>
          <button
            className="admin__ghost"
            onClick={() => {
              setMenu(seedMenu);
              setImages(JSON.parse(JSON.stringify(categoryImages)));
              notify("Draft reset to the sample data.");
            }}
          >
            Reset to sample data
          </button>
          <Link href="/" className="admin__ghost admin__ghost--link">
            Back to the site
          </Link>
        </div>
      </header>

      <p className="admin__demo">
        <span className="admin__demotag">Demo</span>
        This is the menu backend, open for anyone to look through. Type, add,
        reorder, delete and swap the photography as much as you like. Nothing is
        saved and the public site is never touched, so a refresh puts it all back.
      </p>

      <div className="admin__main">
        <section className="admin__card">
          <h2>Menu intro</h2>
          <label>
            Body copy, shown above the category tabs
            <textarea
              rows={2}
              value={menu.intro}
              onChange={(e) => setMenu((m) => ({ ...m, intro: e.target.value }))}
              onBlur={() => notify()}
            />
          </label>
        </section>

        <section className="admin__card">
          <div className="admin__cardhead">
            <h2>Dishes ({visible.length})</h2>
            <button className="admin__primary" onClick={addDish}>
              + Add dish
            </button>
          </div>

          <div className="admin__filter">
            <button
              className="admin__chip"
              data-active={filter === "All"}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className="admin__chip"
                data-active={filter === c}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="admin__dishes">
            {visible.map((d, i) => (
              <li
                key={d.id}
                className="admin__dish admin__dish--flat"
                data-dish={d.id}
                data-fresh={d.id === freshId}
              >
                <div className="admin__dishfields">
                  <div className="admin__grid2">
                    <label>
                      Name
                      <input
                        value={d.name}
                        onChange={(e) => patchDish(d.id, { name: e.target.value })}
                        onBlur={() => notify()}
                      />
                    </label>
                    <label>
                      Category
                      <select
                        value={d.category}
                        onChange={(e) => {
                          patchDish(d.id, { category: e.target.value as Category });
                          notify();
                        }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label>
                    Price <span className="admin__opt">(optional)</span>
                    <input
                      value={d.price}
                      placeholder="e.g. supplement +$8"
                      onChange={(e) => patchDish(d.id, { price: e.target.value })}
                      onBlur={() => notify()}
                    />
                  </label>
                  <label>
                    Description
                    <textarea
                      rows={2}
                      value={d.description}
                      onChange={(e) => patchDish(d.id, { description: e.target.value })}
                      onBlur={() => notify()}
                    />
                  </label>
                </div>

                <div className="admin__dishact">
                  <button onClick={() => move(d.id, -1)} disabled={i === 0} aria-label="Move up">
                    ↑
                  </button>
                  <button
                    onClick={() => move(d.id, 1)}
                    disabled={i === visible.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    className="admin__del"
                    onClick={() => removeDish(d.id, d.name)}
                    aria-label="Remove dish"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="admin__card">
          <div className="admin__cardhead">
            <h2>Photography ({photoCount})</h2>
            <span className="admin__opt">
              These are the photos on the menu page, one carousel per category.
            </span>
          </div>

          {shownCategories.map((cat) => (
            <div key={cat} className="admin__photogroup">
              <div className="admin__photohead">
                <h3>{cat}</h3>
                <span className="admin__opt">
                  {images[cat].length === 1 ? "1 photo" : `${images[cat].length} photos`}
                </span>
              </div>

              <ul className="admin__photos">
                {images[cat].map((img, i) => (
                  <li key={img.src + i} className="admin__photo">
                    <div className="admin__photoframe">
                      {/* plain img: uploaded photos are blob: URLs, which the
                          next/image loader has nothing to optimise */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={img.position ? { objectPosition: img.position } : undefined}
                      />
                      <div className="admin__photoact">
                        <button
                          onClick={() => movePhoto(cat, i, -1)}
                          disabled={i === 0}
                          aria-label="Move photo earlier"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => movePhoto(cat, i, 1)}
                          disabled={i === images[cat].length - 1}
                          aria-label="Move photo later"
                        >
                          →
                        </button>
                        <button
                          className="admin__del"
                          onClick={() => removePhoto(cat, i)}
                          aria-label={`Remove photo from ${cat}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <label>
                      Alt text
                      <input
                        value={img.alt}
                        onChange={(e) => patchPhoto(cat, i, { alt: e.target.value })}
                        onBlur={() => notify()}
                      />
                    </label>
                  </li>
                ))}

                <li className="admin__photo admin__photo--add">
                  <label className="admin__upload">
                    <span className="admin__uploadmark" aria-hidden="true">
                      +
                    </span>
                    <span className="admin__uploadlabel">Add photo</span>
                    <span className="admin__opt">JPG or PNG, landscape</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        uploadPhoto(cat, e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </li>
              </ul>

              {images[cat].length === 0 && (
                <p className="admin__empty">
                  No photos left in {cat}. The carousel for this category would be
                  empty on the live site.
                </p>
              )}
            </div>
          ))}
        </section>

        <p className="admin__foot">
          A working preview of how the menu would be managed day to day. On a live
          build this saves to the site in one click, and uploaded photography goes
          to the image library rather than living in this browser tab.
        </p>
      </div>

      <div className="admin__toast" role="status" aria-live="polite" data-on={!!toast}>
        {toast}
      </div>
    </div>
  );
}
