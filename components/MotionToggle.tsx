"use client";

import { useEffect, useState } from "react";

/**
 * Pause control for everything that moves on its own (the looping videos,
 * the hero glow, the embers). WCAG 2.2.2. One site-wide state on
 * <html data-motion>, remembered for the visitor.
 */
export function MotionToggle({ className = "" }: { className?: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setPaused(document.documentElement.dataset.motion === "paused");
    const onChange = () =>
      setPaused(document.documentElement.dataset.motion === "paused");
    window.addEventListener("ferrant:motion", onChange);
    return () => window.removeEventListener("ferrant:motion", onChange);
  }, []);

  function toggle() {
    const next = !paused;
    const root = document.documentElement;
    if (next) root.dataset.motion = "paused";
    else delete root.dataset.motion;
    try {
      localStorage.setItem("ferrant.motion", next ? "paused" : "on");
    } catch {}
    window.dispatchEvent(new Event("ferrant:motion"));
  }

  return (
    <button
      type="button"
      className={`motion-toggle ${className}`}
      onClick={toggle}
      aria-pressed={paused}
    >
      <span className="motion-toggle__icon" aria-hidden="true">
        {paused ? (
          <svg viewBox="0 0 12 12" width="10" height="10"><path d="M3 1.5v9l7-4.5z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" /></svg>
        )}
      </span>
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
