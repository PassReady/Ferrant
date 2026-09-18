"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping footage. preload="none" and a poster always; plays only
 * while on screen, never under reduced motion, and stops when the visitor
 * pauses motion. `eager` is for the first-screen hero only.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      const paused = document.documentElement.dataset.motion === "paused";
      if (visible && !paused && !reduce.matches && !document.hidden) {
        if (v.preload === "none") v.preload = "auto";
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    window.addEventListener("ferrant:motion", sync);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      window.removeEventListener("ferrant:motion", sync);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
