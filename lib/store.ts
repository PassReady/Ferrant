"use client";

import { useSyncExternalStore } from "react";
import { seedMenu, type MenuState, type Dish } from "./menu";

const KEY = "ferrant.menu.v2";

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
  setMeta(patch: Partial<Pick<MenuState, "week" | "priceNote" | "wine">>) {
    state = { ...state, ...patch };
    persist();
  },
  updateDish(id: string, patch: Partial<Dish>) {
    state = {
      ...state,
      dishes: state.dishes.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    };
    persist();
  },
  addDish() {
    const dish: Dish = {
      id: uid(),
      name: "New course",
      price: "",
      description: "Describe what it is and how the fire cooked it.",
      image: "/img/charcoal-fire.jpg",
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
    const i = state.dishes.findIndex((d) => d.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= state.dishes.length) return;
    const next = [...state.dishes];
    [next[i], next[j]] = [next[j], next[i]];
    state = { ...state, dishes: next };
    persist();
  },
  reset() {
    state = seedMenu;
    persist();
  },
};
