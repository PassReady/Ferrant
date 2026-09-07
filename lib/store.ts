"use client";

import { useSyncExternalStore } from "react";
import { seedMenu, type MenuState, type Dish, type Category } from "./menu";

const KEY = "ferrant.menu.v3";

/**
 * A tiny localStorage-backed store shared by the Menu page and the demo admin.
 * Changes made in /admin persist in the browser and show on /menu.
 * It is per-browser and can be wiped with "Reset to sample data" — fine for a demo.
 */

let state: MenuState = seedMenu;
let loaded = false;
const listeners = new Set<() => void>();

function load(): MenuState {
  if (typeof window === "undefined") return seedMenu;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seedMenu;
    const parsed = JSON.parse(raw) as MenuState;
    if (!parsed?.dishes?.length) return seedMenu;
    return parsed;
  } catch {
    return seedMenu;
  }
}

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  state = load();
  if (typeof window !== "undefined") {
    // keep tabs / the menu page in sync with edits made in admin
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) {
        state = load();
        listeners.forEach((l) => l());
      }
    });
  }
}

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  ensureLoaded();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

function getServerSnapshot() {
  return seedMenu;
}

export function useMenu(): MenuState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ---- mutations (used by the admin) ----

const uid = () => "d" + Math.random().toString(36).slice(2, 8);

export const menuActions = {
  setIntro(intro: string) {
    state = { ...state, intro };
    persist();
  },
  updateDish(id: string, patch: Partial<Dish>) {
    state = {
      ...state,
      dishes: state.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    };
    persist();
  },
  addDish(category: Category) {
    const dish: Dish = {
      id: uid(),
      category,
      name: "New dish",
      price: "",
      description: "Describe what it is and how the fire cooked it.",
    };
    state = { ...state, dishes: [...state.dishes, dish] };
    persist();
    return dish.id;
  },
  removeDish(id: string) {
    state = { ...state, dishes: state.dishes.filter((d) => d.id !== id) };
    persist();
  },
  move(id: string, dir: -1 | 1) {
    // reorders within the dish's own category so the visible tab list moves as expected
    const cat = state.dishes.find((d) => d.id === id)?.category;
    if (!cat) return;
    const ids = state.dishes.filter((d) => d.category === cat).map((d) => d.id);
    const i = ids.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    const byId = new Map(state.dishes.map((d) => [d.id, d]));
    let cursor = 0;
    const next = state.dishes.map((d) =>
      d.category === cat ? byId.get(ids[cursor++])! : d,
    );
    state = { ...state, dishes: next };
    persist();
  },
  reset() {
    state = seedMenu;
    persist();
  },
};
