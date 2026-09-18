import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/CountUp";
import { SplitScroll } from "@/components/SplitScroll";
import { Annotated } from "@/components/Annotated";
import { Scrub } from "@/components/Scrub";
import { CloseBand } from "@/components/CloseBand";
import { Btn } from "@/components/Btn";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ferrant is named for ferrum, iron: the building at 12 Sable Lane was a smithy before it was a restaurant, and the kitchen still runs on one fire.",
};

export default function StoryPage() {
  return (
    <>
      {/* hero: pull-back photo, bottom scrim, hero stats */}
      <section className="sh">
        <div className="sh__media">
          <Image
            src="/img/charcoal-fire.jpg"
            alt="Flames on the grill, tended fire"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="sh__scrim" aria-hidden="true" />
        <div className="wrap sh__in">
          <p className="eyebrow load" style={{ ["--i" as string]: 0 }}>
            Our story
          </p>
          <h1 className="sh__title load load--lg" style={{ ["--i" as string]: 1 }}>
            One fire, no <em className="acc">shortcuts.</em>
          </h1>
          <dl className="sh__stats">
            <div className="load" style={{ ["--i" as string]: 2 }}>
              <dt>Built as a smithy</dt>
              <dd>
                <CountUp to={1887} from={1800} />
              </dd>
            </div>
            <div className="load" style={{ ["--i" as string]: 3 }}>
              <dt>Fire, lit at dawn</dt>
              <dd>
                <CountUp to={1} from={0} ms={900} />
              </dd>
            </div>
            <div className="load" style={{ ["--i" as string]: 4 }}>
              <dt>Gas lines</dt>
              <dd>
                <CountUp to={0} from={5} ms={1400} />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <SplitScroll />
      <Annotated />

      <section className="quote" aria-label="From Ada Ferrant">
        <span className="grain" aria-hidden="true" />
        <div className="wrap quote__in">
          <p className="eyebrow" data-rv="">
            From the chef
          </p>
          <Scrub
            as="blockquote"
            className="quote__text"
            text="Come hungry, sit close to the heat, and give us the night. We'll take it from there."
            accent={["heat,", "night."]}
          />
          <p className="quote__cite" data-rv="">
            Ada Ferrant, chef and owner
          </p>
        </div>
      </section>

      <CloseBand
        video="/video/cta-bread.mp4"
        poster="/img/oven-fire.jpg"
        eyebrow="Dinner nightly from 5:30pm"
        title="Give us the"
        accent="night."
      >
        <Btn href="/reservations?book=1">Reserve a table</Btn>
        <Btn href="/menu" variant="ghost">
          See the menu
        </Btn>
      </CloseBand>
    </>
  );
}
