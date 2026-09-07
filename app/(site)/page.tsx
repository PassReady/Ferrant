import Link from "next/link";
import { FireHero } from "@/components/FireHero";
import { Frame } from "@/components/Frame";
import { seedMenu } from "@/lib/menu";

export default function Home() {
  const teaser = seedMenu.dishes.slice(2, 6);

  return (
    <>
      <FireHero />

      {/* asymmetric intro — statement offset from supporting text */}
      <section className="wrap band home-intro">
        <h2 className="home-intro__lead">
          One fire. We built the room around it.
        </h2>
        <div className="home-intro__body prose">
          <p>
            There is a single fire at Ferrant and it is lit before anyone
            arrives. Bread bakes on the stones. Fish goes on the bars. Milk is
            skinned by the heat, honeycomb loosened until it runs. Nothing here
            is finished with a flame at the end &mdash; the fire is how the food
            is made.
          </p>
          <p>
            Twelve seats, one seating, seven o&rsquo;clock. The whole room eats
            the same menu on the same night, and it changes every Wednesday with
            what the fire is hot enough for and what the boats bring in.
          </p>
        </div>
      </section>

      <Frame
        src="/img/chef-grill.jpg"
        alt="A whole fish grilling over embers, smoke rising off the bars"
        ratio="21 / 9"
        sizes="100vw"
        position="center 58%"
        light={["50%", "44%"]}
      />

      <section className="wrap band home-week">
        <div className="home-week__head">
          <span className="home-week__label">{seedMenu.week}</span>
          <h2>What the fire is doing this week</h2>
        </div>
        <ol className="home-week__list">
          {teaser.map((d) => (
            <li key={d.id}>
              <span className="home-week__name">{d.name}</span>
              <span className="home-week__how">{d.description}</span>
            </li>
          ))}
        </ol>
        <Link href="/menu" className="link">
          The full menu, and the wine
        </Link>
      </section>

      <section className="callout">
        <div className="wrap band callout__in">
          <h2>
            Twelve seats.
            <br />
            One seating.
          </h2>
          <Link href="/reservations" className="act">
            Reserve a table
          </Link>
        </div>
      </section>
    </>
  );
}
