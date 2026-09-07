import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { CtaVideo } from "@/components/CtaVideo";
import { EventSpaceSection } from "@/components/EventSpaceSection";

export const metadata: Metadata = {
  title: "Event Spaces",
  description:
    "Private events at Ferrant — the chef's table, the fireside room for up to ten, or the long table for a group of ten to sixteen.",
};

const chefsTable: [string, string][] = [
  ["Seats", "Two to six"],
  ["Where", "The counter, to yourselves"],
  ["Food", "The full tasting menu, wine optional"],
  ["From", "$210 per person"],
];

const fireside: [string, string][] = [
  ["Seats", "Up to ten, one table"],
  ["Where", "Private room, own hearth"],
  ["Food", "Full menu; first courses cooked in the room"],
  ["From", "$230 per person, room minimum applies"],
];

const longTable: [string, string][] = [
  ["Seats", "Ten to sixteen, one long table"],
  ["Where", "Main dining room"],
  ["Food", "The à la carte menu, shared where you like"],
  ["From", "No minimum spend, standard menu pricing"],
];

export default function EventsPage() {
  return (
    <>
      {/* page hero — the cook-at-the-pass photo that used to sit behind
          the Chef's Table section now sits behind the page intro instead */}
      <section className="evintro">
        <div className="evintro__bg">
          <Frame
            src="/img/fire-person.jpg"
            alt="A cook working flame at the pass, seen from the counter"
            light={["44%", "52%"]}
            priority
            sizes="100vw"
          />
        </div>
        <div className="evintro__scrim" aria-hidden="true" />
        <div className="wrap evintro__in">
          <h1>Take the room for a night</h1>
          <p className="phead__sub">
            We host private events on Monday, the night we&rsquo;re closed to
            the public. Same fire, same kitchen, same menu &mdash; cooked for
            your group instead of the room. Three ways to do it.
          </p>
        </div>
      </section>

      {/* 1 — text left, image right */}
      <EventSpaceSection
        id="chefs-table"
        imageSide="right"
        tag="One &mdash; The Chef's Table"
        heading="Sit in front of the pass"
        image={{
          src: "/img/chefs-table-kitchen.jpg",
          alt: "An open kitchen counter at night, cooks working the pass and the fire beyond",
          light: ["58%", "42%"],
        }}
        space="The Chef's Table"
        facts={chefsTable}
      >
        <p>
          Take the counter for the evening. Up to six of you sit directly in
          front of the fire while we cook &mdash; close enough to feel the
          heat and ask what&rsquo;s happening between courses. The full menu,
          run at your pace. A birthday, a work dinner that isn&rsquo;t a
          boardroom, anyone who wants to watch the whole thing happen.
        </p>
      </EventSpaceSection>

      {/* 2 — mirrored: image left, text right */}
      <EventSpaceSection
        id="fireside-room"
        imageSide="left"
        tag="Two &mdash; The Fireside Room"
        heading="The Fireside Room"
        image={{
          src: "/img/dinner-candle.jpg",
          alt: "A group around a long candlelit table in a dark private room",
          light: ["50%", "46%"],
        }}
        space="The Fireside Room"
        facts={fireside}
      >
        <p>
          A room off the pass, with a hearth of its own and a door you can
          close. It holds up to ten around one table. We cook the tasting
          menu next door and carry it through, but the snacks and the first
          course come off your own fire, in the room, in front of you.
        </p>
        <p>
          For a dinner where you want the group to yourselves and still want
          a fire in the room. The wine can run as a pairing or from the
          list, and the kitchen will work around the table&rsquo;s pace
          rather than the other way around.
        </p>
      </EventSpaceSection>

      {/* 3 — text left, image right */}
      <EventSpaceSection
        id="long-table"
        imageSide="right"
        tag="Three &mdash; The Long Table"
        heading="The Long Table"
        image={{
          src: "/img/long-table-set.jpg",
          alt: "A long banquet table set with candles and plates, no one seated yet",
          light: ["50%", "40%"],
        }}
        space="The Long Table"
        facts={longTable}
      >
        <p>
          A communal table in the main room, set apart for your group but
          still part of the night. Good for a birthday, a work dinner that
          isn&rsquo;t a boardroom, or any group who wants the room around
          them rather than a door closed on it. Same menu as everyone else,
          same fire, just more elbow room.
        </p>
      </EventSpaceSection>

      <section className="ev-close callout">
        <CtaVideo src="/video/cta-skewer.mp4" poster="/img/meat-fire.jpg" />
        <div className="callout__scrim" aria-hidden="true" />
        <div className="wrap band">
          <p className="lede measure">
            Whichever space suits, tell us the date and the numbers and
            we&rsquo;ll take it from there.
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
