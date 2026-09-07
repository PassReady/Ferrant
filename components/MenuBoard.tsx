"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/store";
import { CATEGORIES, catId, categoryImages, type Category } from "@/lib/menu";
import { CtaVideo } from "@/components/CtaVideo";
import { MenuCategoryRow } from "@/components/MenuCategoryRow";
import { MenuDishes } from "@/components/MenuDishes";
import { MenuCategoryImage } from "@/components/MenuCategoryImage";

/**
 * Two structures render for the same data — see the comment on
 * .menu3__board--split in globals.css for why. Both carry an id per
 * category (suffixed -stack / -split); only one is ever visible at a given
 * viewport width, so scrolling/highlighting picks whichever actually has
 * layout (offsetParent !== null) rather than assuming which one it is.
 */
function visibleCatEl(cat: Category): HTMLElement | null {
  const stack = document.getElementById(`${catId(cat)}-stack`);
  if (stack && stack.offsetParent !== null) return stack;
  const split = document.getElementById(`${catId(cat)}-split`);
  if (split && split.offsetParent !== null) return split;
  return null;
}

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
          const el = visibleCatEl(cat);
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
    visibleCatEl(cat)?.scrollIntoView({
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

      {/* mobile/tablet: heading → dishes → photo, repeated per category */}
      <div className="menu3__board menu3__board--stack">
        {CATEGORIES.map((cat) => (
          <MenuCategoryRow
            key={cat}
            category={cat}
            dishes={menu.dishes.filter((d) => d.category === cat)}
            images={categoryImages[cat]}
          />
        ))}
      </div>

      {/* desktop: a continuous dish list beside a continuous image rail */}
      <div className="menu3__board menu3__board--split">
        <div className="menu3__list">
          {CATEGORIES.map((cat) => (
            <div key={cat} id={`${catId(cat)}-split`} className="menu3__cattext">
              <h2 className="menu3__catheading">{cat}</h2>
              <MenuDishes dishes={menu.dishes.filter((d) => d.category === cat)} />
            </div>
          ))}
        </div>
        <div className="menu3__images">
          {CATEGORIES.map((cat) => (
            <MenuCategoryImage key={cat} images={categoryImages[cat]} />
          ))}
        </div>
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
