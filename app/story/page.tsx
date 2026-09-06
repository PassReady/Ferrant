import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Ferrant is built around one fire, one seating a night, and a chef's table that faces the room.",
};

export default function StoryPage() {
  return (
    <>
      <section className="wrap phead center">
        <p className="story-open">
          We built the room around the fire, then worked out where the seats
          went.
        </p>
      </section>

      <section className="wrap">
        <div className="column story-body prose">
          <p>
            There is one fire at Ferrant and it is lit hours before anyone
            arrives. Everything on the menu meets it &mdash; bread on the
            hearthstones, fish on the bars, leeks buried in the embers until they
            collapse, milk skinned by the heat of it. Fire isn&rsquo;t a flavour
            we add at the end. It&rsquo;s the whole method. If a dish can&rsquo;t
            be made over the flame, it isn&rsquo;t on the menu.
          </p>
          <p>
            Twelve seats, one seating, seven o&rsquo;clock. We cook one menu and
            the whole room eats it together, at roughly the same pace. It changes
            every week because the fire changes &mdash; how hard the coals are
            running, what it&rsquo;s hot enough for that night, what came in from
            the market and the boats that morning. Some weeks it&rsquo;s eight
            courses, some weeks it&rsquo;s ten. We don&rsquo;t decide far in
            advance.
          </p>
        </div>

      </section>

      <figure className="story-figure bleed">
        <Frame
          src="/img/firewood.jpg"
          alt="Glowing coals under a bed of ash, flame moving through"
          caption="The fire is lit hours before anyone arrives."
          ratio="21 / 9"
          light={["50%", "56%"]}
          sizes="100vw"
        />
      </figure>

      <section className="wrap">
        <div className="column story-body prose">
          <p>
            The pass is open and it faces the room. There&rsquo;s no wall between
            you and the cooking. You watch the fish go on. You hear the fat catch
            and see the flare come up. By the time a plate reaches you,
            you&rsquo;ve already watched most of what happened to it &mdash; and
            that&rsquo;s the point. Dinner here is something you watch as much as
            eat. It runs about three hours.
          </p>
          <p>
            We keep it to twelve because that&rsquo;s how many people one cook
            can feed properly off one fire in an evening, and because at twelve
            the room stays a room and not a service. You&rsquo;ll talk to the
            people either side of you. You&rsquo;ll talk to us.
          </p>
        </div>
      </section>

      <figure className="story-figure bleed">
        <Frame
          src="/img/room-dim.jpg"
          alt="The dark dining room, one warm light over the bar"
          caption="The room, before service."
          ratio="21 / 9"
          light={["58%", "44%"]}
          sizes="100vw"
        />
      </figure>

      <section
        className="wrap"
        style={{ paddingBottom: "var(--band)", paddingTop: "1rem" }}
      >
        <div className="column story-close">
          <p>
            Come hungry, sit close to the heat, and give us the night.
            We&rsquo;ll take it from there.
          </p>
          <cite>Ada Ferrant, chef and owner</cite>
          <p style={{ marginTop: "2.25rem", fontFamily: "var(--font-text)" }}>
            <Link href="/contact" className="act">
              Booking enquiry
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
