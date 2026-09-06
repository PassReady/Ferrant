import Link from "next/link";
import { FireHero } from "@/components/FireHero";
import { Frame } from "@/components/Frame";
import { teaser, menuWeek } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <FireHero />

      <section className="wrap band">
        <div className="column stack-sm">
          <h2 style={{ fontSize: "var(--d-2)" }}>
            One fire. We built the room around it.
          </h2>
          <div className="prose" style={{ fontSize: "var(--t-1)" }}>
            <p>
              There is a single fire at Ferrant and it is lit before anyone
              arrives. Bread bakes on the stones. Fish goes on the bars. Milk is
              skinned by the heat, honeycomb loosened until it runs. Nothing here
              is finished with a flame at the end &mdash; the fire is how the
              food is made.
            </p>
            <p>
              Twelve seats, one seating, seven o&rsquo;clock. The whole room eats
              the same menu on the same night, and it changes every Wednesday
              with what the fire is hot enough for and what the boats bring in.
            </p>
          </div>
        </div>
      </section>

      <Frame
        src="/img/chef-grill.jpg"
        alt="A whole fish grilling over embers, smoke rising off the bars"
        caption="The pass faces the room. You watch the fish go on."
        ratio="16 / 9"
        sizes="100vw"
        position="center 60%"
        light={["50%", "44%"]}
      />

      <section className="wrap band">
        <p className="eyebrow">{menuWeek}</p>
        <h2
          style={{
            fontSize: "var(--d-2)",
            margin: "0.7rem 0 2.25rem",
            maxWidth: "16ch",
          }}
        >
          What the fire is doing this week
        </h2>
        <div>
          {teaser.map((c) => (
            <div key={c.name} className="teaser__row">
              <span className="teaser__name">{c.name}</span>
              <span className="teaser__how">{c.how}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/menu" className="link">
            The full menu, and the wine
          </Link>
        </p>
      </section>

      <section className="callout">
        <div className="wrap band callout__in">
          <h2>Ask for a night</h2>
          <Link href="/contact" className="act">
            Booking enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
