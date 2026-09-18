import Image from "next/image";
import Link from "next/link";

const SPACES = [
  {
    href: "/events#chefs-table",
    name: "The Chef's",
    accent: "Table",
    line: "Up to six of you, right at the counter, in front of the fire.",
    chips: ["2 to 6 guests", "From $210pp"],
    src: "/img/chefs-table-kitchen.jpg",
    alt: "An open kitchen counter at night, cooks working the pass and the fire beyond",
    pos: "50% 38%",
  },
  {
    href: "/events#fireside-room",
    name: "The Fireside",
    accent: "Room",
    line: "A private room off the pass, with a hearth of its own.",
    chips: ["Up to 10 guests", "From $230pp"],
    src: "/img/dinner-candle.jpg",
    alt: "A group around a long candlelit table in a dark private room",
    pos: "50% 50%",
  },
  {
    href: "/events#long-table",
    name: "The Long",
    accent: "Table",
    line: "Ten to sixteen at one table, with the room around you.",
    chips: ["10 to 16 guests", "Menu pricing"],
    src: "/img/long-table-set.jpg",
    alt: "A long banquet table set with candles and plates, no one seated yet",
    pos: "50% 45%",
  },
];

/**
 * Depth stack (Visionary): each space is a full-screen card that pins
 * flush and is covered by the next. The covered card blurs and recedes;
 * the incoming photo pulls back from 1.25x while its title and line rise
 * over different distances (200px and 150px), so they settle one after
 * the other. Whole card is the link. Falls back to a plain sticky stack.
 */
export function DepthStack() {
  return (
    <section className="ds" aria-labelledby="ds-title">
      <div className="wrap ds__head">
        <p className="eyebrow" data-rv="">Private events, Mondays</p>
        <h2 id="ds-title" className="ds__title" data-rv="" style={{ ["--d" as string]: 1 }}>
          Take the room for a <em className="acc">night.</em>
        </h2>
      </div>
      <div className="wrap ds__stack">
        {SPACES.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            className="ds__card"
            style={{ ["--n" as string]: i, viewTimelineName: `--ds${i}` } as React.CSSProperties}
          >
            <div className="ds__img">
              <Image src={s.src} alt={s.alt} fill sizes="95vw" style={{ objectPosition: s.pos }} />
            </div>
            <div className="ds__scrim" aria-hidden="true" />
            <div className="ds__chips">
              {s.chips.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <span className="ds__num tnum" aria-hidden="true">0{i + 1} / 03</span>
            <div className="ds__copy">
              <h3 className="ds__name">
                {s.name} <em className="acc">{s.accent}</em>
              </h3>
              <p className="ds__line">{s.line}</p>
              <span className="btn btn--ghost ds__cta" aria-hidden="true">
                <span className="btn__label"><span className="btn__roll" data-text="See the space">See the space</span></span>
                <span className="btn__disc">
                  <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
