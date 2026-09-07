"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Staggered word reveal. The block sits hidden until it crosses into view,
 * then each word rises and warms in turn — a wave that runs once and stays.
 * Not a scroll-linked opacity fade; a real entrance.
 * prefers-reduced-motion: shown immediately, no motion.
 */
export function RevealText({
  children,
  as: Tag = "p",
}: {
  children: string;
  as?: "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const words = children.split(/(\s+)/); // keep whitespace tokens

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let wi = -1;
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal${shown ? " is-shown" : ""}`}>
      {words.map((w, i) => {
        if (!w.trim()) return <span key={i}>{w}</span>;
        wi += 1;
        return (
          <span
            key={i}
            className="reveal__w"
            style={{ ["--wi" as string]: wi }}
          >
            {w}
          </span>
        );
      })}
    </Tag>
  );
}
