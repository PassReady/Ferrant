import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryFlow } from "@/components/EnquiryFlow";
import { CloseBand } from "@/components/CloseBand";

export const metadata: Metadata = {
  title: "Event Spaces",
  description:
    "Private events at Ferrant: the chef's table, the fireside room for up to ten, or the long table for a group of ten to sixteen.",
};

type Space = {
  id: string;
  num: string;
  tag: string;
  heading: string;
  accent: string;
  space: string;
  image: { src: string; alt: string; pos?: string };
  facts: [string, string][];
  body: React.ReactNode;
};

// copy for the three spaces is carried over verbatim (standing
// instruction since v3); only the layout around it changed
const SPACES: Space[] = [
  {
    id: "chefs-table",
    num: "01",
    tag: "The Chef's Table",
    heading: "Sit in front of the",
    accent: "pass",
    space: "The Chef's Table",
    image: {
      src: "/img/chefs-table-kitchen.jpg",
      alt: "An open kitchen counter at night, cooks working the pass and the fire beyond",
      pos: "50% 40%",
    },
    facts: [
      ["Seats", "Two to six"],
      ["Where", "The counter, to yourselves"],
      ["Food", "The full tasting menu, wine optional"],
      ["From", "$210 per person"],
    ],
    body: (
      <p>
        Take the counter for the evening. Up to six of you sit directly in front
        of the fire while we cook &mdash; close enough to feel the heat and ask
        what&rsquo;s happening between courses. The full menu, run at your pace.
        A birthday, a work dinner that isn&rsquo;t a boardroom, anyone who wants
        to watch the whole thing happen.
      </p>
    ),
  },
  {
    id: "fireside-room",
    num: "02",
    tag: "The Fireside Room",
    heading: "The Fireside",
    accent: "Room",
    space: "The Fireside Room",
    image: {
      src: "/img/dinner-candle.jpg",
      alt: "A group around a long candlelit table in a dark private room",
    },
    facts: [
      ["Seats", "Up to ten, one table"],
      ["Where", "Private room, own hearth"],
      ["Food", "Full menu; first courses cooked in the room"],
      ["From", "$230 per person, room minimum applies"],
    ],
    body: (
      <>
        <p>
          A room off the pass, with a hearth of its own and a door you can
          close. It holds up to ten around one table. We cook the tasting menu
          next door and carry it through, but the snacks and the first course
          come off your own fire, in the room, in front of you.
        </p>
        <p>
          For a dinner where you want the group to yourselves and still want a
          fire in the room. The wine can run as a pairing or from the list, and
          the kitchen will work around the table&rsquo;s pace rather than the
          other way around.
        </p>
      </>
    ),
  },
  {
    id: "long-table",
    num: "03",
    tag: "The Long Table",
    heading: "The Long",
    accent: "Table",
    space: "The Long Table",
    image: {
      src: "/img/long-table-set.jpg",
      alt: "A long banquet table set with candles and plates, no one seated yet",
    },
    facts: [
      ["Seats", "Ten to sixteen, one long table"],
      ["Where", "Main dining room"],
      ["Food", "The à la carte menu, shared where you like"],
      ["From", "No minimum spend, standard menu pricing"],
    ],
    body: (
      <p>
        A communal table in the main room, set apart for your group but still
        part of the night. Good for a birthday, a work dinner that isn&rsquo;t a
        boardroom, or any group who wants the room around them rather than a
        door closed on it. Same menu as everyone else, same fire, just more
        elbow room.
      </p>
    ),
  },
];

const STEPS = [
  {
    title: "Enquire",
    body: "Tell us the date, the numbers and which space. A person replies within a day.",
    icon: <path d="M2 4.5h12v8H2zM2 4.5l6 4.5 6-4.5" />,
  },
  {
    title: "We hold the date",
    body: "Mondays are ours to give. The night is held while you settle the details.",
    icon: <path d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3" />,
  },
  {
    title: "We cook",
    body: "The fire is lit for you at dawn. Arrive hungry and leave the rest to us.",
    icon: <path d="M8 1.8c2.6 2.2 4 4.4 4 6.8a4 4 0 0 1-8 0c0-1.6.7-3 1.8-4.2.1 1.4.8 2.3 1.7 2.6C7.2 5.3 7.4 3.4 8 1.8Z" />,
  },
];

export default function EventsPage() {
  return (
    <>
      {/* hero: centre vignette, pull-back headline, segmented control */}
      <section className="eh">
        <div className="eh__media">
          <Image
            src="/img/fire-person.jpg"
            alt="A cook working flame at the pass, seen from the counter"
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: "50% 45%" }}
          />
        </div>
        <div className="eh__scrim" aria-hidden="true" />
        <div className="wrap eh__in">
          <p className="eyebrow load" style={{ ["--i" as string]: 0 }}>
            Private events, Mondays
          </p>
          <h1 className="eh__title load load--lg" style={{ ["--i" as string]: 1 }}>
            Take the room for a <em className="acc">night.</em>
          </h1>
          <p className="eh__stand load" style={{ ["--i" as string]: 2 }}>
            We host private events on Monday, the night we&rsquo;re closed to the
            public. Same fire, same kitchen, same menu, cooked for your group
            instead of the room. Three ways to do it.
          </p>
          <nav className="seg load" style={{ ["--i" as string]: 3 }} aria-label="The three spaces">
            {SPACES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="seg__opt">
                {s.tag}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* stepped stack (Roofaro): each panel pins 20px lower than the last */}
      <section className="st" aria-label="The three spaces">
        <span className="grain" aria-hidden="true" />
        <div className="wrap st__stack">
          {SPACES.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="st__panel"
              data-side={i % 2 ? "left" : "right"}
              style={{ ["--n" as string]: i }}
            >
              <div className="st__img">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 900px) 55vw, 100vw"
                  style={s.image.pos ? { objectPosition: s.image.pos } : undefined}
                />
                <span className="chip st__chip">{s.num} / 03</span>
              </div>
              <div className="st__copy">
                <p className="eyebrow">{s.tag}</p>
                <h2 className="st__h">
                  {s.heading} <em className="acc">{s.accent}</em>
                </h2>
                <div className="st__body">{s.body}</div>
                <dl className="st__facts">
                  {s.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <EnquiryFlow space={s.space} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* how it works: space-between cards, dealt in on scroll */}
      <section className="how" aria-labelledby="how-title">
        <div className="wrap">
          <div className="how__head">
            <p className="eyebrow" data-rv="">How it works</p>
            <h2 id="how-title" className="how__title" data-rv="" style={{ ["--d" as string]: 1 }}>
              Three steps to your <em className="acc">night.</em>
            </h2>
          </div>
          <ol className="how__grid">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card" style={{ ["--n" as string]: i }}>
                <div className="card__top">
                  <span className="card__icon" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span className="card__num tnum" aria-hidden="true">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="card__title">{s.title}</h3>
                  <p className="card__body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CloseBand
        video="/video/cta-skewer.mp4"
        poster="/img/meat-fire.jpg"
        eyebrow="Or email events@ferrant.au"
        title="Tell us the"
        accent="date."
      >
        <EnquiryFlow space="a private night" />
      </CloseBand>
    </>
  );
}
