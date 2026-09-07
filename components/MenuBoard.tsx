"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/store";
import { CATEGORIES, catId, type Category } from "@/lib/menu";
import { categoryImages } from "@/lib/menu";
import { CtaVideo } from "@/components/CtaVideo";
import { MenuCategoryRow } from "@/components/MenuCategoryRow";

/**
 * Each category is its own row: a 2-up grid of dishes beside its own photo
 * carousel (see MenuCategoryRow) — Bites pairs with the first image section,
 * Entrées with the second, and so on down the page. The tab bar is a
 * shortcut that jumps between rows and highlights whichever one is in view
 * (a scrollspy — "last heading past the activation line" — not
 * IntersectionObserver); it no longer drives the images, those are static
 * until clicked.
 */
export function MenuBoard() {
  const menu = useMenu();
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
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

  function scrollToCategory(cat: Category) {
    document.getElementById(catId(cat))?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <div className="menu3">
      <section className="wrap menu3__head">
        <h1>The Menu</h1>
        <p className="phead__sub">{menu.intro}</p>
      </section>

      <div className="menu3__tabsrow wrap">
        <div className="menu3__tabs" role="tablist" aria-label="Menu categories">
          <div className="menu3__tabgroup">
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
        </div>
      </div>

      <div className="wrap menu3__board">
        {CATEGORIES.map((cat) => (
          <MenuCategoryRow
            key={cat}
            category={cat}
            dishes={menu.dishes.filter((d) => d.category === cat)}
            images={categoryImages[cat]}
          />
        ))}
      </div>

      <section className="menu3__foot callout">
        <CtaVideo src="/video/cta-grill.mp4" poster="/img/charcoal-fire.jpg" />
        <div className="callout__scrim" aria-hidden="true" />
        <div className="wrap band callout__in">
          <h2>Save your seat by the fire.</h2>
          <Link href="/reservations" className="act">
            Reserve a table
          </Link>
        </div>
      </section>
    </div>
  );
}
