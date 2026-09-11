"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, catId, categoryImages, seedMenu, type Category } from "@/lib/menu";
import { CtaVideo } from "@/components/CtaVideo";
import { Frame } from "@/components/Frame";
import { MenuCategoryRow } from "@/components/MenuCategoryRow";

/**
 * Each category is its own row: heading + dishes beside its own photo (see
 * MenuCategoryRow) — Bites pairs with the first photo section, Entrées
 * with the second, and so on down the page. The tab bar is a shortcut that
 * jumps between rows and highlights whichever one is in view (a scrollspy
 * — "last heading past the activation line" — not IntersectionObserver);
 * it doesn't drive the images, those only change when clicked.
 */
export function MenuBoard() {
  const menu = seedMenu;
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
      <section className="menu3__head">
        <div className="menu3__head-bg">
          <Frame
            src="/img/menu-hero.jpg"
            alt="An artfully plated dish, seen from above"
            light={["50%", "45%"]}
            priority
            sizes="100vw"
          />
        </div>
        <div className="menu3__head-scrim" aria-hidden="true" />
        <div className="wrap menu3__head-in">
          <h1>The Menu</h1>
          <p className="phead__sub">{menu.intro}</p>
        </div>
      </section>

      <div className="menu3__tabsrow">
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

      <div className="menu3__board">
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
