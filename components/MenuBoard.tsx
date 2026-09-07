"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/store";
import { CATEGORIES, categoryImages, type Category } from "@/lib/menu";

const catId = (c: Category) => `cat-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/**
 * One continuous, single scrolling dish list grouped by category. A
 * scrollspy (not IntersectionObserver — the "last heading that's scrolled
 * past the activation line" algorithm) tracks which category is in view and
 * highlights its tab + swaps the sticky image panel to that category's
 * photos. Tabs are still clickable as a shortcut (smooth-scrolls to the
 * section). The 3–4 photos within a category are stepped through manually
 * with dots/arrows — that part doesn't move on its own.
 */
export function MenuBoard() {
  const menu = useMenu();
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [imgIndex, setImgIndex] = useState(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    let raf = 0;
    const ACTIVATION_LINE = 170; // px from viewport top — below the sticky tabs

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let current: Category = CATEGORIES[0];
        for (const cat of CATEGORIES) {
          const el = document.getElementById(catId(cat));
          if (!el) continue;
          if (el.getBoundingClientRect().top - ACTIVATION_LINE <= 0) {
            current = cat;
          }
        }
        if (current !== activeRef.current) setActive(current);
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

  // the image set follows the category in view — reset to its first photo
  // whenever scroll (or a tab click) moves us into a new one
  useEffect(() => {
    setImgIndex(0);
  }, [active]);

  function scrollToCategory(cat: Category) {
    document.getElementById(catId(cat))?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  const images = categoryImages[active];
  const shown = images[Math.min(imgIndex, images.length - 1)];

  return (
    <div className="menu3">
      <section className="wrap menu3__head">
        <h1>The Menu</h1>
        <p className="phead__sub">{menu.intro}</p>
      </section>

      <div className="menu3__tabs wrap" role="tablist" aria-label="Menu categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={c === active}
            data-active={c === active}
            className="menu3__tab"
            onClick={() => scrollToCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="wrap menu3__board">
        <div className="menu3__list">
          {CATEGORIES.map((cat) => (
            <section key={cat} id={catId(cat)} className="menu3__cat">
              <h2 className="menu3__catheading">{cat}</h2>
              <ol className="menu3__dishes">
                {menu.dishes
                  .filter((d) => d.category === cat)
                  .map((d) => (
                    <li key={d.id} className="menu3__row">
                      <div className="menu3__rowhead">
                        <h3>{d.name}</h3>
                        {d.price ? (
                          <span className="menu3__price">{d.price}</span>
                        ) : null}
                      </div>
                      <p>{d.description}</p>
                    </li>
                  ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="menu3__panel">
          <div className="menu3__frame">
            <Image
              key={shown.src}
              src={shown.src}
              alt={shown.alt}
              fill
              sizes="(min-width: 58rem) 38vw, 100vw"
              priority={imgIndex === 0}
            />
            <span className="frame__grade" aria-hidden="true" />
          </div>

          {images.length > 1 && (
            <div className="menu3__carousel">
              <button
                type="button"
                className="menu3__arrow"
                onClick={() =>
                  setImgIndex((i) => (i - 1 + images.length) % images.length)
                }
                aria-label="Previous photo"
              >
                ‹
              </button>
              <div className="menu3__dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="menu3__dot"
                    data-active={i === imgIndex}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Photo ${i + 1} of ${images.length}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="menu3__arrow"
                onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="wrap menu3__foot">
        <Link href="/reservations" className="act">
          Reserve a table
        </Link>
      </div>
    </div>
  );
}
