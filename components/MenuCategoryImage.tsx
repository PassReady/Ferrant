"use client";

import Image from "next/image";
import { useState } from "react";
import type { CategoryImage } from "@/lib/menu";

/**
 * A category's photo panel: static until a visitor clicks a dot or the
 * arrow — never swaps on scroll. Used both inline (mobile/tablet, right
 * after its own category's dishes) and stacked in the desktop image rail,
 * where consecutive categories' panels sit flush against each other.
 */
export function MenuCategoryImage({ images }: { images: CategoryImage[] }) {
  const [imgIndex, setImgIndex] = useState(0);
  const shown = images[Math.min(imgIndex, images.length - 1)];

  return (
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
  );
}
