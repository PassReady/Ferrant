"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-linked word illumination. Each word starts dim and warms to bone as the
 * block moves up through the viewport. prefers-reduced-motion: everything lit.
 */
export function RevealText({
  children,
  as: Tag = "p",
}: {
  children: string;
  as?: "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const words = children.split(/(\s+)/); // keep whitespace tokens
  const wordCount = words.filter((w) => w.trim().length).length;
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(wordCount);
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: starts once the block's top rises past 88% of the
        // viewport, completes as its bottom clears the middle
        const start = vh * 0.88;
        const end = vh * 0.46;
        const p = (start - r.top) / (start - end + r.height * 0.7);
        const clamped = Math.max(0, Math.min(1, p));
        setLit(Math.round(clamped * wordCount));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [wordCount]);

  let wi = -1;
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className="reveal">
      {words.map((w, i) => {
        if (!w.trim()) return <span key={i}>{w}</span>;
        wi += 1;
        return (
          <span
            key={i}
            className="reveal__w"
            data-lit={wi < lit ? "true" : "false"}
          >
            {w}
          </span>
        );
      })}
    </Tag>
  );
}
