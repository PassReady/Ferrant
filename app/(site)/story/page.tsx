import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Frame } from "@/components/Frame";
import { RevealText } from "@/components/RevealText";
import { CtaVideo } from "@/components/CtaVideo";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ferrant is named for ferrum, iron: the building at 12 Sable Lane was a smithy before it was a restaurant, and the kitchen still runs on one fire.",
};

export default function StoryPage() {
  return (
    <>
      {/* hero — heading and sub-line overlaid directly on the fire
          photo, not a separate section */}
      <section className="story-hero2">
        <div className="story-hero2__media">
          <Image
            src="/img/charcoal-fire.jpg"
            alt="Flames on the grill, tended fire"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="story-hero2__scrim" aria-hidden="true" />
        <div className="wrap story-hero2__in">
          <h1>One fire, no shortcuts</h1>
          <p className="story-hero2__sub">
            It&rsquo;s been the only thing running hot in this building
            since 1887.
          </p>
        </div>
      </section>

      {/* section 1, "the forge" — side by side, image left */}
      <section className="wrap story-sec story-sec--side">
        <div className="story-sec__media">
          <Frame
            src="/img/forge-smith.jpg"
            alt="A blacksmith working hot iron at the forge, sparks flying"
            light={["38%", "55%"]}
            sizes="(min-width: 54rem) 50vw, 100vw"
          />
        </div>
        <div className="story-sec__copy">
          <span className="story-sec__tag">The forge</span>
          <h2>Before it fed people, it fed horses.</h2>
          <RevealText>
            12 Sable Lane was a smithy &mdash; the forge that shod horses
            and repaired the ironwork for the surrounding lanes. When
            Ferrant took the building over, the old forge chimney was
            still standing. Rather than pull it out, the kitchen was
            built around it. The fire that once bent iron now bakes
            bread and sears fish, in exactly the same spot it&rsquo;s
            always burned.
          </RevealText>
        </div>
      </section>

      {/* section 2, "the rule" — a wide image band above a full-width
          editorial text block, not a paired column */}
      <section className="story-sec story-sec--stack">
        <div className="story-sec__media">
          <Frame
            src="/img/oven-fire.jpg"
            alt="Flames and embers inside the wood-fired hearth"
            light={["50%", "48%"]}
            sizes="100vw"
          />
        </div>
        <div className="wrap story-sec__copy">
          <span className="story-sec__tag">The rule</span>
          <h2>One fire does the job of five.</h2>
          <RevealText>
            There&rsquo;s no gas line at Ferrant and no combi oven in
            the back. One wood fire does everything &mdash; bakes the
            bread, sears the fish, chars the vegetables, finishes the
            dessert. If it can&rsquo;t be cooked over flame, it
            isn&rsquo;t on the menu. Not a gimmick &mdash; the kitchen
            genuinely doesn&rsquo;t have another option.
          </RevealText>
        </div>
      </section>

      {/* section 3, "the ritual" — full-bleed photo, offset card: the
          most different of the three, an overlay rather than a
          paired column */}
      <section className="story-sec story-sec--banner">
        <div className="story-sec__media">
          <Image
            src="/img/fire-skewer.jpg"
            alt="A skewer lifted from the glowing coals at first light"
            fill
            sizes="100vw"
          />
        </div>
        <div className="story-sec__scrim" aria-hidden="true" />
        <div className="story-sec__card">
          <span className="story-sec__tag">The ritual</span>
          <h2>Lit at dawn, out after the last table.</h2>
          <RevealText>
            The fire is built fresh every morning, hours before
            service, and tended without a break until the last plate
            goes out. Whoever&rsquo;s on the fire that day doesn&rsquo;t
            leave it &mdash; everything else in the kitchen works
            around what the fire is doing, not the other way round.
          </RevealText>
        </div>
      </section>

      {/* section 4 — the strongest line pulled into a standalone
          statement, supporting text smaller beneath it */}
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
            An open kitchen with the pass facing straight into the room
            means there&rsquo;s no wall between the fire and the tables
            &mdash; the flare when fat hits the coals, the bread coming
            off the stones, the last plate of the night going out.
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
