"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    tag: "The forge",
    heading: "Before it fed people, it fed",
    accent: "horses.",
    text: "12 Sable Lane was a smithy: the forge that shod horses and mended the ironwork for the surrounding lanes. When Ferrant took the building over, the old forge chimney was still standing. Rather than pull it out, the kitchen was built around it. The fire that once bent iron now bakes bread and sears fish, in the same spot it has always burned.",
    src: "/img/forge-smith.jpg",
    alt: "A blacksmith working hot iron at the forge, sparks flying",
  },
  {
    tag: "The rule",
    heading: "One fire does the job of",
    accent: "five.",
    text: "There is no gas line at Ferrant and no combi oven in the back. One wood fire does everything: bakes the bread, sears the fish, chars the vegetables, finishes the dessert. If it cannot be cooked over flame, it is not on the menu. Not a gimmick. The kitchen genuinely has no other option.",
    src: "/img/oven-fire.jpg",
    alt: "Flames and embers inside the wood-fired hearth",
  },
  {
    tag: "The ritual",
    heading: "Lit at dawn, out after the last",
    accent: "table.",
    text: "The fire is built fresh every morning, hours before service, and tended without a break until the last plate goes out. Whoever is on the fire that day does not leave it. Everything else in the kitchen works around what the fire is doing, not the other way round.",
    src: "/img/fire-skewer.jpg",
    alt: "A skewer lifted from the glowing coals at first light",
  },
];

/**
 * Alternating split scroll (Pactum). At desktop the section pins: the
 * photo half holds while the copy half changes, and for the third beat the
 * two halves trade sides. Scroll position picks the beat; the change
 * itself is a timed transition. Below 900px, or with reduced motion, it is
 * three plain stacked beats with no pinning.
 */
export function SplitScroll() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const p =
          total > 0
            ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total))
            : 0;
        setActive(Math.min(BEATS.length - 1, Math.floor(p * BEATS.length * 0.999)));
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
    <section
      className="ss"
      ref={ref}
      data-swap={active === 2}
      aria-label="The forge, the rule, the ritual"
    >
      <div className="ss__pin">
        <div className="ss__media">
          {BEATS.map((b, i) => (
            <div key={b.src} className="ss__photo" data-active={i === active}>
              <Image src={b.src} alt={b.alt} fill sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          ))}
          <div className="ss__progress" aria-hidden="true">
            {BEATS.map((b, i) => (
              <span key={b.tag} data-active={i <= active} />
            ))}
          </div>
        </div>
        <div className="ss__copy">
          <span className="grain" aria-hidden="true" />
          {BEATS.map((b, i) => (
            <article key={b.tag} className="ss__beat" data-active={i === active}>
              <div className="ss__beat-photo">
                <Image src={b.src} alt="" fill sizes="(max-width: 900px) 100vw, 1px" />
              </div>
              <p className="eyebrow">
                <span className="tnum">0{i + 1}</span> {b.tag}
              </p>
              <h2 className="ss__h">
                {b.heading} <em className="acc">{b.accent}</em>
              </h2>
              <p className="ss__text">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
