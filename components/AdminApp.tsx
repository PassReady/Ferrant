"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMenu, menuActions } from "@/lib/store";
import { CATEGORIES, type Category } from "@/lib/menu";

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
  const [filter, setFilter] = useState<Category | "All">("All");

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
          <p>Demo backend. Manage the à la carte menu.</p>
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

  const visible = menu.dishes.filter((d) => filter === "All" || d.category === filter);

  return (
    <div className="admin__wrap">
      <header className="admin__top">
        <div>
          <strong>Ferrant CMS</strong>
          <span className="admin__crumb">Menu</span>
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
          <h2>Menu intro</h2>
          <label>
            Body copy, shown above the category tabs
            <textarea
              rows={2}
              value={menu.intro}
              onChange={(e) => {
                menuActions.setIntro(e.target.value);
                flash();
              }}
            />
          </label>
        </section>

        <section className="admin__card">
          <div className="admin__cardhead">
            <h2>Dishes ({visible.length})</h2>
            <button
              className="admin__primary"
              onClick={() => {
                menuActions.addDish(filter === "All" ? "Bites" : filter);
                flash();
              }}
            >
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
                        onChange={(e) => {
                          menuActions.updateDish(d.id, { name: e.target.value });
                          flash();
                        }}
                      />
                    </label>
                    <label>
                      Category
                      <select
                        value={d.category}
                        onChange={(e) => {
                          menuActions.updateDish(d.id, {
                            category: e.target.value as Category,
                          });
                          flash();
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
                      onChange={(e) => {
                        menuActions.updateDish(d.id, { price: e.target.value });
                        flash();
                      }}
                    />
                  </label>
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
                    disabled={i === visible.length - 1}
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
          Changes save to this browser and appear on the menu page immediately.
          Sample data only — refresh with “Reset” any time. Category photography
          is fixed per tab, not per dish.
        </p>
      </div>
    </div>
  );
}
