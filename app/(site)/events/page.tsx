import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Event Spaces",
  description:
    "Private events at Ferrant — the chef's table, the fireside room for up to ten, or the long table for a group of ten to sixteen.",
};

const chefsTable = {
  facts: [
    ["Seats", "Two to six"],
    ["Where", "The counter, to yourselves"],
    ["Food", "The full tasting menu, wine optional"],
    ["From", "$210 per person"],
    ["Notice", "Three weeks or more"],
  ],
};

const fireside = {
  facts: [
    ["Seats", "Up to ten, one table"],
    ["Where", "Private room, own hearth"],
    ["Food", "Full menu; first courses cooked in the room"],
    ["From", "$230 per person, room minimum applies"],
    ["Notice", "Four weeks or more"],
  ],
};

const longTable = {
  facts: [
    ["Seats", "Ten to sixteen, one long table"],
    ["Where", "Main dining room"],
    ["Food", "The à la carte menu, shared where you like"],
    ["From", "No minimum spend, standard menu pricing"],
    ["Notice", "One week or more"],
  ],
};

export default function EventsPage() {
  return (
    <>
      <section className="wrap phead">
        <h1>Take the room for a night</h1>
        <p className="phead__sub">
          We host private events on Monday, the night we&rsquo;re closed to the
          public. Same fire, same kitchen, same menu &mdash; cooked for your
          group instead of the room. Three ways to do it.
        </p>
      </section>

      {/* 1 — THE CHEF'S TABLE: photo fills the screen, text sits on it */}
      <section id="chefs-table" className="evhero ev-anchor">
        <div className="evhero__bg">
          <Frame
            src="/img/fire-person.jpg"
            alt="A cook working flame at the pass, seen from the counter"
            light={["44%", "52%"]}
            priority
            sizes="100vw"
          />
        </div>
        <div className="evhero__scrim" aria-hidden="true" />
        <div className="wrap evhero__over">
          <span className="evhero__tag">One &mdash; The Chef&rsquo;s Table</span>
          <h2>Sit in front of the pass</h2>
          <p className="evhero__desc">
            Take the counter for the evening. Up to six of you sit directly in
            front of the fire while we cook &mdash; close enough to feel the heat
            and ask what&rsquo;s happening between courses. The full menu, run at
            your pace. A birthday, a work dinner that isn&rsquo;t a boardroom,
            anyone who wants to watch the whole thing happen.
          </p>
          <ul className="evspec">
            {chefsTable.facts.map(([k, v]) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2 — THE FIRESIDE ROOM: spec pinned in a sidebar, prose scrolls past */}
      <section id="fireside-room" className="wrap evsplit ev-anchor">
        <div className="evsplit__aside">
          <h2>The Fireside Room</h2>
          <ul className="evspec">
            {fireside.facts.map(([k, v]) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="evsplit__flow">
          <p>
            A room off the pass, with a hearth of its own and a door you can
            close.
          </p>
          <Frame
            src="/img/dinner-candle.jpg"
            alt="A group around a long candlelit table in a dark private room"
            light={["50%", "46%"]}
            sizes="(min-width: 54rem) 60vw, 100vw"
          />
          <p>
            It holds up to ten around one table. We cook the tasting menu next
            door and carry it through, but the snacks and the first course come
            off your own fire, in the room, in front of you.
          </p>
          <p>
            For a dinner where you want the group to yourselves and still want a
            fire in the room. The wine can run as a pairing or from the list, and
            the kitchen will work around the table&rsquo;s pace rather than the
            other way around.
          </p>
        </div>
      </section>

      {/* 3 — THE LONG TABLE: twin image band, full-width copy, facts as a row */}
      <section id="long-table" className="evlong ev-anchor">
        <div className="wrap evlong__head">
          <h2>The Long Table</h2>
          <p className="evlong__desc">
            A communal table in the main room, set apart for your group but
            still part of the night. Good for a birthday, a work dinner that
            isn&rsquo;t a boardroom, or any group who wants the room around
            them rather than a door closed on it. Same menu as everyone else,
            same fire, just more elbow room.
          </p>
        </div>
        <div className="evlong__strip bleed">
          <Frame
            src="/img/table-candle.jpg"
            alt="Candlelit tables set in the dining room"
            ratio="4 / 5"
            light={["46%", "40%"]}
            sizes="(min-width: 40rem) 50vw, 100vw"
          />
          <Frame
            src="/img/room-dim.jpg"
            alt="The main dining room, warm pendant lights over the bar"
            ratio="4 / 5"
            light={["55%", "35%"]}
            sizes="(min-width: 40rem) 50vw, 100vw"
          />
        </div>
        <div className="wrap">
          <ul className="evspec evlong__facts">
            {longTable.facts.map(([k, v]) => (
              <li key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ev-close">
        <div className="wrap band">
          <p className="lede measure">
            Tell us the date and the number, and we&rsquo;ll come back with a
            plan and a price.
          </p>
          <p style={{ marginTop: "1.75rem" }}>
            <Link href="/reservations" className="act">
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
        </div>
      </section>
    </>
  );
}
