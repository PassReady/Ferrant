import { Curtain } from "@/components/Curtain";
import { HomeHero } from "@/components/HomeHero";
import { Scrub } from "@/components/Scrub";
import { ExpandBleed } from "@/components/ExpandBleed";
import { MenuAccordion } from "@/components/MenuAccordion";
import { CounterMarquee } from "@/components/CounterMarquee";
import { DepthStack } from "@/components/DepthStack";
import { CloseBand } from "@/components/CloseBand";
import { Btn } from "@/components/Btn";

export default function Home() {
  return (
    <>
      <Curtain />
      <HomeHero />

      {/* the withheld H1 lands here, scrubbed word by word, over the
          background wordmark */}
      <section className="stmt" id="statement" aria-labelledby="stmt-h1">
        <span className="grain" aria-hidden="true" />
        <div className="stmt__word" aria-hidden="true">Ferrant</div>
        <div className="wrap stmt__in">
          <p className="eyebrow" data-rv="">One fire, every dish</p>
          <h1 id="stmt-h1" className="sr-only">
            Ferrant: one wood fire, no gas line, every dish cooked over it.
          </h1>
          <Scrub
            className="stmt__text"
            text="One wood fire. No gas line. Every dish on the menu is cooked over it, from the first bread to the last custard."
            accent={["fire.", "custard."]}
          />
          <div className="stmt__foot" data-rv="">
            <p className="stmt__meta">
              Open Tuesday to Sunday from 5:30pm. Walk in at the bar for a
              plate and a glass, or book ahead for a table.
            </p>
            <Btn href="/story" variant="ghost">Our story</Btn>
          </div>
        </div>
      </section>

      <ExpandBleed />
      <MenuAccordion />
      <CounterMarquee />
      <DepthStack />

      <CloseBand
        video="/video/cta-sear.mp4"
        poster="/img/meat-fire.jpg"
        eyebrow="Dinner nightly from 5:30pm"
        title="Come sit by the"
        accent="fire."
      >
        <Btn href="/reservations?book=1">Reserve a table</Btn>
      </CloseBand>
    </>
  );
}
