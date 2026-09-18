"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for every scroll-triggered entrance on the site. Anything
 * marked `data-rv` (a block) or `data-split` (a masked headline) gets `.in`
 * the first time it enters view, once. The hidden start state only exists
 * under `html.js` and no-preference motion, so without JavaScript, or with
 * reduced motion, everything is simply visible.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // after the first page has shown, any later client navigation to the
    // home page skips the curtain
    const t = setTimeout(() => root.classList.add("seen"), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rv]:not(.in), [data-split]:not(.in)"),
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      // pixels, not a percentage: a % bottom margin can hide the last
      // section forever on a tall viewport
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
