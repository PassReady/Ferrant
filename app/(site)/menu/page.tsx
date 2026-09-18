import type { Metadata } from "next";
import Image from "next/image";
import { CATEGORIES, catId, seedMenu } from "@/lib/menu";
import { MenuIndex } from "@/components/MenuIndex";
import { CloseBand } from "@/components/CloseBand";
import { Btn } from "@/components/Btn";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The à la carte menu at Ferrant: bites through to dessert, everything cooked over one wood fire.",
};

const NOTES = [
  {
    title: "Dietaries",
    body: "Tell us when you book. Most dishes can be cooked without meat, dairy or gluten.",
    icon: <path d="M8 2c2.5 2 4 4.2 4 6.5A4 4 0 0 1 4 8.5C4 6.2 5.5 4 8 2Z" />,
  },
  {
    title: "Bar walk-ins",
    body: "Bar seats are never booked. Come in for a plate and a glass.",
    icon: <path d="M3 3h10l-4 5v5h2M9 13H7M3 3l5 5" />,
  },
  {
    title: "Groups over eight",
    body: "The whole room, the Chef's Table or the Fireside Room, on a Monday.",
    icon: <path d="M2 12.5c0-2 1.6-3.5 3.5-3.5S9 10.5 9 12.5M10 9.2c1.9.2 3.5 1.5 3.5 3.3M5.5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10.5 7a2 2 0 1 0 0-4" />,
  },
];

export default function MenuPage() {
  return (
    <>
      {/* structured hero (Pactum): headline alone on top, hairlines that
          draw in, then a lower band of standfirst, action and a content
          card of the five categories */}
      <section className="mh">
        <div className="mh__media">
          <Image
            src="/img/menu-hero.jpg"
            alt="Plates coming off the fire at the pass"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="mh__scrim" aria-hidden="true" />
        <div className="wrap mh__in">
          <div className="mh__top">
            <p className="eyebrow load" style={{ ["--i" as string]: 0 }}>
              À la carte, nightly
            </p>
            <h1 className="mh__title load load--lg" style={{ ["--i" as string]: 1 }}>
              The <em className="acc">menu.</em>
            </h1>
          </div>
          <span className="mh__rule mh__rule--h" aria-hidden="true" />
          <div className="mh__band">
            <p className="mh__stand load" style={{ ["--i" as string]: 2 }}>
              {seedMenu.intro}
            </p>
            <span className="mh__rule mh__rule--v" aria-hidden="true" />
            <div className="mh__act load" style={{ ["--i" as string]: 3 }}>
              <p className="label">Tuesday to Sunday, from 5:30pm</p>
              <Btn href="/reservations?book=1">Reserve a table</Btn>
            </div>
            <span className="mh__rule mh__rule--v" aria-hidden="true" />
            <nav className="mh__card load" style={{ ["--i" as string]: 4 }} aria-label="Jump to a category">
              <p className="label">Jump to</p>
              <ul>
                {CATEGORIES.map((c, i) => (
                  <li key={c}>
                    <a href={`#${catId(c)}`}>
                      <span className="tnum">0{i + 1}</span>
                      {c}
                      <span className="mh__count tnum">
                        {seedMenu.dishes.filter((d) => d.category === c).length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <MenuIndex />

      {/* ruled grid of space-between cells, hover lift with tonal shift */}
      <section className="notes" aria-labelledby="notes-title">
        <div className="wrap">
          <h2 id="notes-title" className="sr-only">Before you come</h2>
          <div className="notes__grid">
            {NOTES.map((n, i) => (
              <div key={n.title} className="note" data-rv="" style={{ ["--d" as string]: i }}>
                <span className="note__icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    {n.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="note__title">{n.title}</h3>
                  <p className="note__body">{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CloseBand
        video="/video/cta-grill.mp4"
        poster="/img/meat-fire.jpg"
        eyebrow="Dinner nightly from 5:30pm"
        title="Hungry"
        accent="yet?"
      >
        <Btn href="/reservations?book=1">Reserve a table</Btn>
      </CloseBand>
    </>
  );
}
