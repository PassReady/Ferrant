import Link from "next/link";
import { FireHero } from "@/components/FireHero";
import { Frame } from "@/components/Frame";
import { CtaVideo } from "@/components/CtaVideo";

export default function Home() {
  return (
    <>
      <FireHero />

      {/* section 2 — the food, paired directly with the fire that makes it */}
      <section className="wrap band home-cook">
        <div className="home-cook__media">
          <Frame
            src="/img/oven-fire.jpg"
            alt="The fire wall inside the kitchen, hearthstones glowing"
            ratio="4 / 5"
            light={["50%", "48%"]}
            sizes="(min-width: 54rem) 40vw, 100vw"
          />
        </div>
        <div className="home-cook__copy">
          <h2>Cooked over one fire, start to finish</h2>
          <div className="prose">
            <p>
              There&rsquo;s no gas line at Ferrant and no combi oven in the
              back. One wood fire does everything &mdash; it bakes the bread,
              sears the fish, chars the vegetables, and finishes the dessert.
              If it can&rsquo;t be cooked over flame, it isn&rsquo;t on the
              menu.
            </p>
          </div>
        </div>
      </section>

      {/* section 3 — practical info, mirrored layout so it reads differently to section 2 */}
      <section className="wrap band home-hours">
        <div className="home-hours__copy">
          <h2>Dinner, nightly</h2>
          <div className="prose">
            <p>
              Open Tuesday to Sunday from 5:30pm. Walk in at the bar for a
              plate and a glass, or book ahead for a table. The menu changes
              with what the fire and the market give us that week.
            </p>
          </div>
          <Link
            href="/reservations"
            className="link"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Reserve a table
          </Link>
        </div>
        <div className="home-hours__media">
          <Frame
            src="/img/bar-moody.jpg"
            alt="The bar at Ferrant, low light, glasses lined up"
            ratio="4 / 3"
            light={["58%", "40%"]}
            sizes="(min-width: 54rem) 46vw, 100vw"
          />
        </div>
      </section>

      <section className="callout">
        <CtaVideo src="/video/cta-sear.mp4" poster="/img/meat-fire.jpg" />
        <div className="callout__scrim" aria-hidden="true" />
        <div className="wrap band callout__in">
          <h2>Come sit by the fire.</h2>
          <Link href="/reservations" className="act">
            Reserve a table
          </Link>
        </div>
      </section>
    </>
  );
}
