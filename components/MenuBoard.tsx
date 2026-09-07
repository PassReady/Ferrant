"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMenu } from "@/lib/store";
import { CATEGORIES, categoryImages, type Category } from "@/lib/menu";

/**
 * Tabbed menu: dish list for the active category beside a click-through
 * image carousel (dots + arrows) of photography for that category — no
 * scroll-linking, so nothing here reacts to page scroll position.
 */
export function MenuBoard() {
  const menu = useMenu();
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [imgIndex, setImgIndex] = useState(0);

  const dishes = menu.dishes.filter((d) => d.category === active);
  const images = categoryImages[active];
  const shown = images[Math.min(imgIndex, images.length - 1)];

  function selectCategory(c: Category) {
    if (c === active) return;
    setActive(c);
    setImgIndex(0);
  }

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
            onClick={() => selectCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="wrap menu3__board">
        <ol className="menu3__list">
          {dishes.map((d) => (
            <li key={d.id} className="menu3__row">
              <div className="menu3__rowhead">
                <h2>{d.name}</h2>
                {d.price ? <span className="menu3__price">{d.price}</span> : null}
              </div>
              <p>{d.description}</p>
            </li>
          ))}
        </ol>

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
