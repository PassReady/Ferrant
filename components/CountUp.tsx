"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts to its value when it enters view. Server markup
 * holds the final value, so without JS or with reduced motion it is
 * simply correct. `from` lets a stat count down (five to none).
 */
export function CountUp({ to, from = 0, ms = 1600 }: { to: number; from?: number; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVal(from);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / ms);
        const eased = 1 - Math.pow(1 - p, 4);
        setVal(Math.round(from + (to - from) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      // rAF is frozen in background tabs: land on the value regardless
      setTimeout(() => setVal(to), ms + 400);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from, ms]);

  return <span ref={ref} className="tnum">{val}</span>;
}
