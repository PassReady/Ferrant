"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BEATS = [
  <>There&rsquo;s no gas line at Ferrant and no combi oven in the back.</>,
  <>
    One wood fire does everything &mdash; it bakes the bread, sears the fish,
    chars the vegetables, and finishes the dessert.
  </>,
  <>If it can&rsquo;t be cooked over flame, it isn&rsquo;t on the menu.</>,
];

/**
 * A pinned scroll sequence, not another image-beside-text block: the fire
 * image holds still on one side while three short beats replace each other
 * on the other, tied to scroll position rather than all three sitting on
 * the page at once. Below 54rem there's no room for a pinned split, so it
 * degrades to the image once followed by all three beats stacked normally
 * (see the media query in globals.css) — same copy, no scroll-jacking.
 */
export function FireSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const total = el.offsetHeight - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0;
        const idx = Math.min(
          BEATS.length - 1,
          Math.floor(progress * BEATS.length),
        );
        setActive(idx);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="firesq" ref={sectionRef}>
      <div className="firesq__pin">
        <div className="firesq__media">
          <Image
            src="/img/oven-fire.jpg"
            alt="Flames and embers inside the wood-fired hearth"
            fill
            sizes="(min-width: 54rem) 50vw, 100vw"
          />
        </div>
        <div className="firesq__in">
          <h2>Cooked over one fire, start to finish</h2>
          <div className="firesq__beats">
            {BEATS.map((beat, i) => (
              <p
                key={i}
                className="firesq__beat"
                data-active={i === active}
                aria-hidden={i !== active}
              >
                {beat}
              </p>
            ))}
          </div>
          <div className="firesq__dots" aria-hidden="true">
            {BEATS.map((_, i) => (
              <span key={i} className="firesq__dot" data-active={i === active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
