"use client";

import Image from "next/image";
import { useState } from "react";
import { catId, type Category, type CategoryImage, type Dish } from "@/lib/menu";

/**
 * One category: its dishes (2-up grid) beside its own photo carousel. Each
 * category owns its own image section now — nothing swaps automatically as
 * you scroll past it, the photo only changes when the visitor clicks a dot
 * or the arrow.
 */
export function MenuCategoryRow({
  category,
  dishes,
  images,
}: {
  category: Category;
  dishes: Dish[];
  images: CategoryImage[];
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const shown = images[Math.min(imgIndex, images.length - 1)];

  return (
    <section id={catId(category)} className="menu3__catrow">
      <h2 className="menu3__catheading">{category}</h2>
      <ol className="menu3__dishes">
        {dishes.map((d) => (
          <li key={d.id} className="menu3__row">
            <div className="menu3__rowhead">
              <h3>{d.name}</h3>
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
          />
          <span className="frame__grade" aria-hidden="true" />
        </div>

        {images.length > 1 && (
          <div className="menu3__carousel">
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
    </section>
  );
}
