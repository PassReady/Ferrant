import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { RevealText } from "@/components/RevealText";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Ferrant is built around one fire, no gas, no combi oven, and a kitchen that faces the room.",
};

export default function StoryPage() {
  return (
    <>
      <section className="wrap phead story-phead center">
        <h1>One fire, no shortcuts</h1>
      </section>

      <div className="wrap story-rows">
        <div className="story-row">
          <div className="story-row__media">
            <Frame
              src="/img/charcoal-fire.jpg"
              alt="Glowing charcoal and embers, tended fire"
              ratio="5 / 4"
              light={["52%", "50%"]}
              sizes="(min-width: 54rem) 42vw, 100vw"
            />
          </div>
          <div className="story-row__copy">
            <RevealText>
              Ferrant opened with a simple rule: if it can&rsquo;t be cooked
              over the fire, it doesn&rsquo;t go on the plate. No gas, no
              combi oven, no shortcuts in the kitchen &mdash; just one wood
              fire, tended from early morning until the last table is
              cleared.
            </RevealText>
          </div>
        </div>

        <div className="story-row story-row--rev">
          <div className="story-row__media">
            <Frame
              src="/img/dish-veg-fire.jpg"
              alt="Vegetables charring directly over the fire"
              ratio="5 / 4"
              light={["50%", "46%"]}
              sizes="(min-width: 54rem) 42vw, 100vw"
            />
          </div>
          <div className="story-row__copy">
            <RevealText>
              That discipline shapes the whole menu. Bread bakes directly on
              the hearthstones. Fish goes straight onto the bars over the
              coals. Vegetables char against the fire wall until they
              blister. Even dessert finds its way back to the embers before
              it reaches the table.
            </RevealText>
          </div>
        </div>

        <div className="story-row">
          <div className="story-row__media">
            <Frame
              src="/img/grill-night.jpg"
              alt="A flare of flame at the pass at night"
              ratio="5 / 4"
              light={["54%", "48%"]}
              sizes="(min-width: 54rem) 42vw, 100vw"
            />
          </div>
          <div className="story-row__copy">
            <RevealText>
              The dining room is built the same way &mdash; an open kitchen
              with the pass facing straight out into the room, so
              there&rsquo;s no wall between the fire and the tables. You can
              watch the whole thing happen: the flare when fat hits the
              coals, the bread coming off the stones, the last plate of the
              night going out. Dinner here is something you watch as much as
              eat.
            </RevealText>
          </div>
        </div>
      </div>

      <section className="wrap story-close-wrap">
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
