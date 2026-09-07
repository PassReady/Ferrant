import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { RevealText } from "@/components/RevealText";

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

      <div className="story-run">
        <section className="wrap">
          <div className="column story-body">
            <RevealText>
              There is one fire at Ferrant and it is lit hours before anyone
              arrives. Everything on the menu meets it — bread on the
              hearthstones, fish on the bars, leeks buried in the embers until
              they collapse, milk skinned by the heat of it. Fire isn’t a
              flavour we add at the end. It’s the whole method. If a dish can’t
              be made over the flame, it isn’t on the menu.
            </RevealText>
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
          <div className="column story-body">
            <RevealText>
              Twelve seats, one seating, seven o’clock. We cook one menu and the
              whole room eats it together, at roughly the same pace. It changes
              every week because the fire changes — how hard the coals are
              running, what it’s hot enough for that night, what came in from the
              market and the boats that morning. Some weeks it’s eight courses,
              some weeks it’s ten. We don’t decide far in advance.
            </RevealText>
          </div>
        </section>

        <div className="story-split-fig bleed">
          <Frame
            src="/img/fire-person.jpg"
            alt="A cook working a pan of flame in a dark kitchen"
            ratio="4 / 5"
            light={["46%", "56%"]}
            sizes="(min-width: 60rem) 40vw, 100vw"
          />
          <Frame
            src="/img/chef-grill.jpg"
            alt="A whole fish on the bars over embers, smoke rising"
            ratio="4 / 5"
            light={["50%", "44%"]}
            sizes="(min-width: 60rem) 40vw, 100vw"
          />
        </div>

        <section className="wrap">
          <div className="column story-body">
            <RevealText>
              The pass is open and it faces the room. There’s no wall between you
              and the cooking. You watch the fish go on. You hear the fat catch
              and see the flare come up. By the time a plate reaches you, you’ve
              already watched most of what happened to it — and that’s the point.
              Dinner here is something you watch as much as eat. It runs about
              three hours.
            </RevealText>
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
      </div>

      <section
        className="wrap"
        style={{ paddingBottom: "var(--band)", paddingTop: "clamp(3rem,7vw,5rem)" }}
      >
        <div className="column story-close">
          <p>
            Come hungry, sit close to the heat, and give us the night.
            We&rsquo;ll take it from there.
          </p>
          <cite>Ada Ferrant, chef and owner</cite>
          <p style={{ marginTop: "2.25rem", fontFamily: "var(--font-text)" }}>
            <Link href="/reservations" className="act">
              Reserve a table
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
