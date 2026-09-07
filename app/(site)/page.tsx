import Link from "next/link";
import Image from "next/image";
import { FireHero } from "@/components/FireHero";
import { FireSequence } from "@/components/FireSequence";
import { FireMarquee } from "@/components/FireMarquee";
import { CtaVideo } from "@/components/CtaVideo";

export default function Home() {
  return (
    <div className="home">
      <FireHero />

      {/* section 2 — pinned scroll sequence, not another image-beside-text block */}
      <FireSequence />

      <FireMarquee />

      {/* section 3 — full-bleed background with the copy as an offset card,
          not centred, not paired beside the photo */}
      <section className="dinner">
        <div className="dinner__media">
          <Image
            src="/img/chef-grill.jpg"
            alt="Flame and smoke rising off the grill as a dish is turned"
            fill
            sizes="100vw"
          />
        </div>
        <div className="dinner__scrim" aria-hidden="true" />
        <div className="dinner__card">
          <h2>Dinner, nightly</h2>
          <div className="prose">
            <p>
              Open Tuesday to Sunday from 5:30pm. Walk in at the bar for a
              plate and a glass, or book ahead for a table. The menu changes
              with what the fire and the market give us that week.
            </p>
          </div>
          <Link href="/reservations" className="act">
            Reserve a table
          </Link>
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
    </div>
  );
}
