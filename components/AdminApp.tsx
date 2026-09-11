"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { seedMenu, CATEGORIES, type Category, type Dish, type MenuState } from "@/lib/menu";

/**
 * Open demo backend — no login, nothing persisted.
 *
 * Every control works against a draft held in this component only: a visitor can
 * type, add, reorder and delete, see the result immediately, and refresh to get
 * the sample data back. Nothing is written to storage and the public menu page
 * reads `seedMenu` directly, so the live site can't be changed from here.
 * Each action also raises a toast saying so.
 */

const uid = () => "d" + Math.random().toString(36).slice(2, 8);

export function AdminApp() {
  const [menu, setMenu] = useState<MenuState>(seedMenu);
  const [filter, setFilter] = useState<Category | "All">("All");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = useCallback((message = "Demo only, changes aren't saved.") => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const patchDish = (id: string, patch: Partial<Dish>) =>
    setMenu((m) => ({
      ...m,
      dishes: m.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    }));

  function addDish() {
    const category: Category = filter === "All" ? "Bites" : filter;
    setMenu((m) => ({
      ...m,
      dishes: [
        ...m.dishes,
        {
          id: uid(),
          category,
          name: "New dish",
          price: "",
          description: "Describe what it is and how the fire cooked it.",
        },
      ],
    }));
    notify();
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

  const visible = menu.dishes.filter((d) => filter === "All" || d.category === filter);

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
        reorder and delete as much as you like. Nothing is saved and the public
        site is never touched, so a refresh puts it all back.
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
              <li key={d.id} className="admin__dish admin__dish--flat">
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

        <p className="admin__foot">
          A working preview of how the menu would be managed day to day. On a live
          build this saves to the site in one click. Category photography is fixed
          per tab, not per dish.
        </p>
      </div>

      <div className="admin__toast" role="status" aria-live="polite" data-on={!!toast}>
        {toast}
      </div>
    </div>
  );
}
