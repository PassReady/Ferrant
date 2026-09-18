"use client";

import Image from "next/image";
import { useState } from "react";
import { CATEGORIES, catId, seedMenu, type Category } from "@/lib/menu";
import { Btn } from "@/components/Btn";

const PHOTO: Record<Category, { src: string; alt: string }> = {
  Bites: { src: "/img/menu/bites-marrow2.jpg", alt: "Roasted bone marrow, close up" },
  Entrées: { src: "/img/menu/entree-scallop2.jpg", alt: "Scallop and sea urchin on the shell" },
  Mains: { src: "/img/menu/main-lamb2.jpg", alt: "Pulled lamb shoulder with fresh herbs" },
  Sides: { src: "/img/menu/side-potatoes2.jpg", alt: "Baked potato split open with butter" },
  Desserts: { src: "/img/menu/dessert-tart2.jpg", alt: "Chocolate tart with a ganache lattice" },
};

const LINE: Record<Category, string> = {
  Bites: "Small things off the coals while you settle in.",
  Entrées: "Seafood and vegetables, kissed by the flame.",
  Mains: "Whole fish, slow meat, the fire at full strength.",
  Sides: "Charred, smoked, buttered. Order two.",
  Desserts: "Finished in the embers as the fire drops.",
};

/**
 * Hover accordion with image swap (Norfolk), on the one bone band. Rows are
 * real buttons: pointer hover or click opens a row, one is always open, and
 * the linked category photo wipes in beside the list. Touch and keyboard
 * reach every row by click and focus.
 */
export function MenuAccordion() {
  const [active, setActive] = useState<Category>("Mains");

  return (
    <section className="acc-menu" aria-labelledby="acc-menu-title">
      <span className="grain grain--light" aria-hidden="true" />
      <div className="wrap acc-menu__grid">
        <div className="acc-menu__head">
          <p className="eyebrow eyebrow--ink" data-rv="">The menu</p>
          <h2 id="acc-menu-title" className="acc-menu__title" data-rv="" style={{ ["--d" as string]: 1 }}>
            Bites to dessert, <em className="acc">one fire.</em>
          </h2>
        </div>

        <div className="acc-menu__media" aria-hidden="true">
          {CATEGORIES.map((c) => (
            <div key={c} className="acc-menu__photo" data-active={c === active}>
              <Image src={PHOTO[c].src} alt="" fill sizes="(min-width: 60rem) 36vw, 100vw" />
            </div>
          ))}
          <span className="acc-menu__chip">{active}</span>
        </div>

        <ul className="acc-menu__list">
          {CATEGORIES.map((c, i) => {
            const dishes = seedMenu.dishes.filter((d) => d.category === c);
            const open = c === active;
            return (
              <li key={c} className="acc-row" data-open={open} data-rv="" style={{ ["--d" as string]: i * 0.5 }}>
                <button
                  type="button"
                  className="acc-row__head"
                  aria-expanded={open}
                  aria-controls={`acc-${i}`}
                  onClick={() => setActive(c)}
                  onMouseEnter={() => {
                    if (matchMedia("(hover: hover) and (pointer: fine)").matches) setActive(c);
                  }}
                  onFocus={() => setActive(c)}
                >
                  <span className="acc-row__num tnum">0{i + 1}</span>
                  <span className="acc-row__name">{c}</span>
                  <span className="acc-row__count">{dishes.length} dishes</span>
                </button>
                <div className="acc-row__body" id={`acc-${i}`} role="region" aria-label={c}>
                  <div className="acc-row__inner">
                    <p className="acc-row__line">{LINE[c]}</p>
                    <ul className="acc-row__dishes">
                      {dishes.slice(0, 3).map((d) => (
                        <li key={d.id}>
                          <span>{d.name}</span>
                          <span className="tnum">{d.price}</span>
                        </li>
                      ))}
                    </ul>
                    <Btn href={`/menu#${catId(c)}`} variant="ghost" className="btn--ink">
                      {`See all ${c.toLowerCase()}`}
                    </Btn>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
