import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Event Spaces",
  description:
    "Private events at Ferrant — the chef's table, the fireside room for up to ten, or a full buyout of the whole restaurant.",
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

const buyout = {
  facts: [
    ["Seats", "Every table, the whole room"],
    ["Where", "The entire restaurant"],
    ["Food", "The menu, built with you"],
    ["Price", "Per event — we'll quote the date"],
    ["Notice", "Six weeks, more on a weekend"],
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

      {/* 3 — THE BUYOUT: full image with an overlaid line, then a lopsided split */}
      <section id="buyout" className="evbuy ev-anchor">
        <div className="evbuy__full bleed">
          <Frame
            src="/img/firewood.jpg"
            alt="Glowing coals and ash, the fire built up for the night"
            ratio="2.4 / 1"
            light={["50%", "58%"]}
            sizes="100vw"
          />
          <p className="evbuy__stmt">The whole room, every table.</p>
        </div>
        <div className="wrap evbuy__cols">
          <div className="evbuy__major">
            <h2>The Buyout</h2>
            <p>
              Your night, your guest list. We open the door only for your people
              and cook the way we always do &mdash; over one fire &mdash; but
              everything else is yours. Stretch the wine to a longer format, add
              a course, move the start time. Beyond that we keep it simple.
              It&rsquo;s still Ferrant, just closed to everyone else.
            </p>
          </div>
          <aside className="evbuy__minor">
            <ul className="evspec">
              {buyout.facts.map(([k, v]) => (
                <li key={k}>
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </li>
              ))}
            </ul>
          </aside>
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
