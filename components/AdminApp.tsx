"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMenu, menuActions } from "@/lib/store";
import { imageLibrary } from "@/lib/menu";

const USER = "demo";
const PASS = "Ferrant2026";
const SESSION_KEY = "ferrant.admin.session";

export function AdminApp() {
  const menu = useMenu();
  const [authed, setAuthed] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [pickerFor, setPickerFor] = useState<string | null>(null);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {}
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (u.trim() === USER && p === PASS) {
      setAuthed(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    } else {
      setErr(true);
    }
  }

  function flash() {
    setSavedFlash(true);
    window.clearTimeout((flash as any)._t);
    (flash as any)._t = window.setTimeout(() => setSavedFlash(false), 1400);
  }

  if (!authed) {
    return (
      <div className="admin__auth">
        <div className="admin__card admin__login">
          <h1>Ferrant CMS</h1>
          <p>Demo backend. Manage the weekly menu and the images it uses.</p>
          <form onSubmit={login}>
            <label>
              Username
              <input value={u} onChange={(e) => setU(e.target.value)} autoFocus />
            </label>
            <label>
              Password
              <input
                type="password"
                value={p}
                onChange={(e) => setP(e.target.value)}
              />
            </label>
            {err && <p className="admin__err">That didn&rsquo;t match. Try the credentials on the right.</p>}
            <button type="submit">Sign in</button>
          </form>
          <p className="admin__hint">
            <span>Username</span> <code>demo</code>
            <span>Password</span> <code>Ferrant2026</code>
          </p>
          <Link href="/" className="admin__exit">
            ← Back to the site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin__wrap">
      <header className="admin__top">
        <div>
          <strong>Ferrant CMS</strong>
          <span className="admin__crumb">Weekly menu</span>
        </div>
        <div className="admin__topact">
          <span className={`admin__saved${savedFlash ? " is-on" : ""}`}>
            Saved
          </span>
          <Link href="/menu" target="_blank" className="admin__link">
            View menu page ↗
          </Link>
          <button
            className="admin__ghost"
            onClick={() => {
              if (confirm("Reset the menu to the sample data?")) {
                menuActions.reset();
                flash();
              }
            }}
          >
            Reset to sample data
          </button>
          <button
            className="admin__ghost"
            onClick={() => {
              try {
                sessionStorage.removeItem(SESSION_KEY);
              } catch {}
              setAuthed(false);
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="admin__main">
        <section className="admin__card">
          <h2>This week</h2>
          <div className="admin__grid2">
            <label>
              Week label
              <input
                value={menu.week}
                onChange={(e) => {
                  menuActions.setMeta({ week: e.target.value });
                  flash();
                }}
              />
            </label>
            <label>
              Price note
              <input
                value={menu.priceNote}
                onChange={(e) => {
                  menuActions.setMeta({ priceNote: e.target.value });
                  flash();
                }}
              />
            </label>
          </div>
          <label>
            Wine pairing note
            <textarea
              rows={2}
              value={menu.wine}
              onChange={(e) => {
                menuActions.setMeta({ wine: e.target.value });
                flash();
              }}
            />
          </label>
        </section>

        <section className="admin__card">
          <div className="admin__cardhead">
            <h2>Courses ({menu.dishes.length})</h2>
            <button
              className="admin__primary"
              onClick={() => {
                menuActions.addDish();
                flash();
              }}
            >
              + Add course
            </button>
          </div>

          <ul className="admin__dishes">
            {menu.dishes.map((d, i) => (
              <li key={d.id} className="admin__dish">
                <button
                  className="admin__thumb"
                  onClick={() => setPickerFor(d.id)}
                  title="Change image"
                  style={{ backgroundImage: `url(${d.image})` }}
                >
                  <span>Change image</span>
                </button>

                <div className="admin__dishfields">
                  <div className="admin__grid2">
                    <label>
                      Name
                      <input
                        value={d.name}
                        onChange={(e) => {
                          menuActions.updateDish(d.id, { name: e.target.value });
                          flash();
                        }}
                      />
                    </label>
                    <label>
                      Price <span className="admin__opt">(optional)</span>
                      <input
                        value={d.price}
                        placeholder="e.g. supplement +$20"
                        onChange={(e) => {
                          menuActions.updateDish(d.id, { price: e.target.value });
                          flash();
                        }}
                      />
                    </label>
                  </div>
                  <label>
                    Description
                    <textarea
                      rows={2}
                      value={d.description}
                      onChange={(e) => {
                        menuActions.updateDish(d.id, {
                          description: e.target.value,
                        });
                        flash();
                      }}
                    />
                  </label>
                </div>

                <div className="admin__dishact">
                  <button
                    onClick={() => {
                      menuActions.move(d.id, -1);
                      flash();
                    }}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => {
                      menuActions.move(d.id, 1);
                      flash();
                    }}
                    disabled={i === menu.dishes.length - 1}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    className="admin__del"
                    onClick={() => {
                      if (confirm(`Remove “${d.name}”?`)) {
                        menuActions.removeDish(d.id);
                        flash();
                      }
                    }}
                    aria-label="Remove course"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <p className="admin__foot">
          Changes save to this browser and appear on the menu page immediately.
          Sample data only — refresh with “Reset” any time.
        </p>
      </div>

      {pickerFor && (
        <div
          className="admin__picker"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPickerFor(null);
          }}
        >
          <div className="admin__pickerpanel">
            <div className="admin__pickerhead">
              <h3>Choose an image</h3>
              <button onClick={() => setPickerFor(null)}>Close</button>
            </div>
            <div className="admin__pickergrid">
              {imageLibrary.map((img) => (
                <button
                  key={img.src}
                  className="admin__pickitem"
                  style={{ backgroundImage: `url(${img.src})` }}
                  onClick={() => {
                    menuActions.updateDish(pickerFor, { image: img.src });
                    flash();
                    setPickerFor(null);
                  }}
                >
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
            <label className="admin__pickurl">
              Or paste an image URL
              <input
                placeholder="https://…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const v = (e.target as HTMLInputElement).value.trim();
                    if (v) {
                      menuActions.updateDish(pickerFor, { image: v });
                      flash();
                      setPickerFor(null);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
