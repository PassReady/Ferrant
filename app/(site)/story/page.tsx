import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Frame } from "@/components/Frame";
import { RevealText } from "@/components/RevealText";
import { CtaVideo } from "@/components/CtaVideo";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Ferrant is built around one fire, no gas, no combi oven, and a kitchen that faces the room.",
};

export default function StoryPage() {
  return (
    <>
      {/* section 1 — cinematic band above an oversized editorial block,
          full page width throughout, not a narrow centred column */}
      <section className="story-hero">
        <div className="story-hero__media">
          <Frame
            src="/img/charcoal-fire.jpg"
            alt="Glowing charcoal and embers, tended fire"
            light={["52%", "50%"]}
            sizes="100vw"
            priority
          />
        </div>
        <div className="wrap story-hero__body">
          <h1>One fire, no shortcuts</h1>
          <RevealText>
            Ferrant opened with a simple rule: if it can&rsquo;t be cooked
            over the fire, it doesn&rsquo;t go on the plate. No gas, no
            combi oven, no shortcuts in the kitchen &mdash; just one wood
            fire, tended from early morning until the last table is
            cleared.
          </RevealText>
        </div>
      </section>

      {/* section 2 — full-bleed photo, the copy as a small offset card
          rather than paired beside the image */}
      <section className="story-banner">
        <div className="story-banner__media">
          <Image
            src="/img/menu/side-greens2.jpg"
            alt="Broccoli charred hard over the fire wall"
            fill
            sizes="100vw"
          />
        </div>
        <div className="story-banner__scrim" aria-hidden="true" />
        <div className="story-banner__card">
          <RevealText>
            That discipline shapes the whole menu. Bread bakes directly on
            the hearthstones. Fish goes straight onto the bars over the
            coals. Vegetables char against the fire wall until they
            blister. Even dessert finds its way back to the embers before
            it reaches the table.
          </RevealText>
        </div>
      </section>

      {/* section 3 — full-bleed embers with the strongest line pulled out
          into a standalone statement, the rest as smaller support text */}
      <section className="story-pull">
        <div className="story-pull__media">
          <Image
            src="/img/firewood.jpg"
            alt="Glowing embers, ready for the next dish"
            fill
            sizes="100vw"
          />
        </div>
        <div className="story-pull__scrim" aria-hidden="true" />
        <div className="wrap story-pull__in">
          <h2 className="story-pull__quote">
            Dinner here is something you watch as much as eat.
          </h2>
          <RevealText as="div">
            An open kitchen with the pass facing straight out into the
            room means there&rsquo;s no wall between the fire and the
            tables &mdash; the flare when fat hits the coals, the bread
            coming off the stones, the last plate of the night going out.
          </RevealText>
        </div>
      </section>

      <section className="story-close-wrap callout">
        <CtaVideo src="/video/cta-bread.mp4" poster="/img/oven-fire.jpg" />
        <div className="callout__scrim" aria-hidden="true" />
        <div className="wrap band">
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
        </div>
      </section>
    </>
  );
}
