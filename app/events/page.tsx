import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Event Spaces",
  description:
    "Private events at Ferrant — the chef's table, the fireside room for up to ten, or a full buyout of all twelve seats.",
};

type Space = {
  name: string;
  img: string;
  imgAlt: string;
  light: [string, string];
  desc: string;
  facts: [string, string][];
};

const spaces: Space[] = [
  {
    name: "The Chef’s Table",
    img: "/img/fire-person.jpg",
    imgAlt: "A cook working flame at the pass, seen from the counter",
    light: ["44%", "52%"],
    desc: "Take the counter for the evening. Up to six of you sit directly in front of the pass while we cook — close enough to feel the heat and to ask what’s happening between courses. The full menu, run at your pace. Good for a birthday, a work dinner that isn’t a boardroom, or anyone who wants to watch the whole thing happen.",
    facts: [
      ["Seats", "Two to six"],
      ["Where", "The counter, to yourselves"],
      ["Food", "The full tasting menu, wine pairing optional"],
      ["From", "$210 per person"],
      ["Notice", "Three weeks or more"],
    ],
  },
  {
    name: "The Fireside Room",
    img: "/img/dinner-candle.jpg",
    imgAlt: "A group around a long candlelit table in a dark private room",
    light: ["50%", "46%"],
    desc: "The private room sits off the pass and has a hearth of its own. It holds up to ten around one table, with a door you can close. We cook the tasting menu next door and carry it through, but the snacks and the first course come off your own fire, in the room, in front of you. For a dinner where you want the group to yourselves and still want a fire in the room.",
    facts: [
      ["Seats", "Up to ten, one table"],
      ["Where", "Private room, own hearth"],
      ["Food", "Full menu; opening courses cooked in the room"],
      ["From", "$230 per person, room minimum applies"],
      ["Notice", "Four weeks or more"],
    ],
  },
  {
    name: "The Buyout",
    img: "/img/firewood.jpg",
    imgAlt: "Glowing coals and ash, the fire built up",
    light: ["50%", "58%"],
    desc: "The whole room, all twelve seats, your night. We open the door only for your people and cook the way we always do — one menu, one seating — but the guest list is yours. You can stretch the wine pairing to a longer format, add a course, move the start time. Beyond that we keep it simple. It’s still Ferrant, just closed to everyone else.",
    facts: [
      ["Seats", "Up to twelve, the entire room"],
      ["Where", "The whole restaurant"],
      ["Food", "The menu, built with you"],
      ["Price", "Per event — tell us the date and we’ll quote"],
      ["Notice", "Six weeks, more for a weekend"],
    ],
  },
];

export default function EventsPage() {
  return (
    <>
      <section className="wrap phead">
        <h1>Take the room for a night</h1>
        <p className="phead__sub">
          We host private events on the nights we&rsquo;re closed to the public,
          Sunday through Tuesday. Same fire, same kitchen, same one menu &mdash;
          cooked for your group instead of the room. Three ways to do it.
        </p>
      </section>

      <div className="wrap">
        {spaces.map((s) => (
          <section className="ev" key={s.name}>
            <div className="ev__frame">
              <Frame
                src={s.img}
                alt={s.imgAlt}
                light={s.light}
                sizes="(min-width: 74rem) 74rem, 100vw"
              />
            </div>
            <div className="ev__body">
              <h2 className="ev__name">{s.name}</h2>
              <p className="ev__desc">{s.desc}</p>
              <ul className="ev__facts">
                {s.facts.map(([k, v]) => (
                  <li key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section
        className="wrap band"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <p className="lede measure">
          Tell us the date and the number, and we&rsquo;ll come back with a plan
          and a price.
        </p>
        <p style={{ marginTop: "1.75rem" }}>
          <Link href="/contact" className="act">
            Start an event enquiry
          </Link>
        </p>
        <p
          className="dim"
          style={{ marginTop: "1rem", fontSize: "var(--t--1)" }}
        >
          Or email{" "}
          <a className="link" href="mailto:events@ferrant.au">
            events@ferrant.au
          </a>{" "}
          directly.
        </p>
      </section>
    </>
  );
}
