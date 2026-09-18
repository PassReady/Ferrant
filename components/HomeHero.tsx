import Image from "next/image";
import { AmbientVideo } from "@/components/AmbientVideo";
import { MotionToggle } from "@/components/MotionToggle";
import { Btn } from "@/components/Btn";

/**
 * Withheld-H1 hero (AOMI): footage, the flame mark, an eyebrow and one
 * standfirst. The H1 lands in the statement below, after the first scroll.
 * The second job is the frosted "Tonight" card with the booking action and
 * the hours. Five blocks, 200ms apart, on a CSS load sequence that needs no
 * script.
 */
export function HomeHero() {
  return (
    <section className="hh" aria-label="Ferrant, Fitzroy">
      <div className="hh__media">
        <AmbientVideo
          src="/video/hero-fire.mp4"
          poster="/img/charcoal-fire.jpg"
          className="hh__video"
          eager
        />
      </div>
      <div className="hh__glow" aria-hidden="true" />
      <div className="hh__scrim" aria-hidden="true" />

      <div className="wrap hh__in">
        <div className="hh__mark load" style={{ ["--i" as string]: 0 }}>
          <Image src="/img/ferrant-flame-icon.png" alt="" width={508} height={773} priority />
        </div>
        <p className="eyebrow load" style={{ ["--i" as string]: 1 }}>
          12 Sable Lane, Fitzroy
        </p>
        <p className="hh__stand load load--lg" style={{ ["--i" as string]: 2 }}>
          A kitchen built around a single wood <em className="acc">fire.</em>
        </p>
      </div>

      <div className="hh__foot wrap">
        <a className="hh__cue load" href="#statement" style={{ ["--i" as string]: 3 }}>
          <span className="hh__cue-line" aria-hidden="true" />
          Scroll
        </a>

        <aside className="tonight load" style={{ ["--i" as string]: 4 }} aria-label="Tonight">
          <div className="tonight__row">
            <span className="tonight__dot" aria-hidden="true" />
            <span className="label">Tonight</span>
          </div>
          <p className="tonight__time">Dinner from 5:30pm</p>
          <p className="tonight__note">Tuesday to Sunday. Bar seats are walk-in.</p>
          <Btn href="/reservations?book=1">Reserve a table</Btn>
        </aside>
      </div>

      <MotionToggle className="hh__toggle load" />
    </section>
  );
}
