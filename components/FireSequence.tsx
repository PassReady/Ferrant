"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    heading: <>No gas. No shortcuts.</>,
    text: (
      <>There&rsquo;s no gas line at Ferrant and no combi oven in the back.</>
    ),
    src: "/img/oven-fire.jpg",
    alt: "Flames and embers inside the wood-fired hearth",
  },
  {
    heading: <>One fire does it all.</>,
    text: (
      <>
        One wood fire does everything: it bakes the bread, sears the fish,
        chars the vegetables, and finishes the dessert.
      </>
    ),
    src: "/img/fire-skewer.jpg",
    alt: "A skewer of meat lifted from the glowing coals, smoke rising",
  },
  {
    heading: <>No flame, no menu.</>,
    text: <>If it can&rsquo;t be cooked over flame, it isn&rsquo;t on the menu.</>,
    src: "/img/fire-flambe.jpg",
    alt: "A cook working beside a rising flame in a dark kitchen",
    // biased up and away from the burner ring visible at the very
    // bottom of the source photo — keeps the frame reading as fire and
    // hands, not stovetop equipment
    position: "center 25%",
    // the flaming-pan shot is the one photo shown on mobile, where
    // there's no crossfade — see .firesq__photo[data-mobile-default]
    mobileDefault: true,
  },
];

/**
 * A pinned scroll sequence, not another image-beside-text block: at
 * desktop, one side holds still while three short beats — each with its
 * own photo — replace each other on the other side, tied to scroll
 * position rather than all three sitting on the page at once. Below
 * 54rem there's no room for a pinned split, so it degrades to the first
 * photo followed by all three beats stacked normally (see the media
 * query in globals.css) — same copy, no scroll-jacking.
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
          {BEATS.map((beat, i) => (
            <div
              key={beat.src}
              className="firesq__photo"
              data-active={i === active}
              data-mobile-default={beat.mobileDefault ? "true" : undefined}
            >
              <Image
                src={beat.src}
                alt={beat.alt}
                fill
                sizes="(min-width: 54rem) 50vw, 100vw"
                priority={i === 0}
                style={beat.position ? { objectPosition: beat.position } : undefined}
              />
            </div>
          ))}
        </div>
        <div className="firesq__in">
          <div className="firesq__watermark" aria-hidden="true">
            <Image src="/img/ferrant-flame-icon.png" alt="" fill sizes="22rem" />
          </div>
          <div className="firesq__copy">
            {BEATS.map((beat, i) => (
              <div
                key={i}
                className="firesq__beatgroup"
                data-active={i === active}
                aria-hidden={i !== active}
              >
                <h2 className="firesq__heading">{beat.heading}</h2>
                <p className="firesq__beat">{beat.text}</p>
              </div>
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
