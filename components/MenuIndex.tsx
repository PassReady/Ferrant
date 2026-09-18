"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, catId, categoryImages, seedMenu, type Category } from "@/lib/menu";
import { MenuCategoryImage } from "@/components/MenuCategoryImage";

/**
 * Sticky index (Phisio): the five categories pinned to the left, the
 * active one following the reader down the menu, with a progress rail.
 * Each category on the right is its photo carousel (click-through, never
 * scroll-driven) and its dishes as ruled rows with a hover fill. Below
 * 900px the index becomes a sticky row of chips.
 */
export function MenuIndex() {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.35;
        let current: Category = CATEGORIES[0];
        for (const c of CATEGORIES) {
          const el = document.getElementById(catId(c));
          if (el && el.getBoundingClientRect().top - line <= 0) current = c;
        }
        setActive(current);
        const box = listRef.current?.getBoundingClientRect();
        if (box) {
          const p = (line - box.top) / Math.max(1, box.height - window.innerHeight * 0.5);
          setProgress(Math.min(1, Math.max(0, p)));
        }
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

  function jump(e: React.MouseEvent, c: Category) {
    const el = document.getElementById(catId(c));
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${catId(c)}`);
  }

  return (
    <section className="mi" aria-label="The menu">
      <span className="grain" aria-hidden="true" />
      <div className="wrap mi__grid">
        <nav className="mi__index" aria-label="Menu categories">
          <p className="label mi__index-label">The menu</p>
          <ol>
            {CATEGORIES.map((c, i) => (
              <li key={c}>
                <a
                  href={`#${catId(c)}`}
                  onClick={(e) => jump(e, c)}
                  aria-current={c === active ? "true" : undefined}
                  className="mi__link"
                >
                  <span className="tnum mi__n">0{i + 1}</span>
                  <span className="mi__c">{c}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mi__rail" aria-hidden="true">
            <span style={{ transform: `scaleY(${progress})` }} />
          </div>
        </nav>

        <div className="mi__list" ref={listRef}>
          {CATEGORIES.map((c, i) => {
            const dishes = seedMenu.dishes.filter((d) => d.category === c);
            return (
              <article key={c} id={catId(c)} className="mi__cat">
                <header className="mi__head">
                  <span className="tnum mi__num" data-rv="">0{i + 1}</span>
                  <h2 className="mi__title split" data-split="">
                    <span className="w"><span className="w__in">{c}</span></span>
                  </h2>
                  <span className="label" data-rv="">{dishes.length} dishes</span>
                </header>
                <div className="mi__photo" data-rv="">
                  <MenuCategoryImage images={categoryImages[c]} />
                </div>
                <ul className="mi__dishes">
                  {dishes.map((d, j) => (
                    <li key={d.id} className="dish" data-rv="" style={{ ["--d" as string]: j * 0.4 }}>
                      <div className="dish__main">
                        <h3 className="dish__name">{d.name}</h3>
                        <p className="dish__desc">{d.description}</p>
                      </div>
                      <span className="dish__price tnum">{d.price}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
