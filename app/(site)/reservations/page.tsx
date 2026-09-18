import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";
import { AmbientVideo } from "@/components/AmbientVideo";
import { MotionToggle } from "@/components/MotionToggle";

export const metadata: Metadata = {
  title: "Reserve a table",
  description:
    "Book a table at Ferrant, Fitzroy. Dinner nightly from 5:30pm, Tuesday to Sunday.",
};

export default function ReservationsPage() {
  return (
    <>
      {/* asymmetric grid: the booking action left, contained video right */}
      <section className="rv">
        <span className="grain" aria-hidden="true" />
        <div className="wrap rv__grid">
          <div className="rv__lead">
            <p className="eyebrow load" style={{ ["--i" as string]: 0 }}>
              Reservations
            </p>
            <h1 className="rv__title load load--lg" style={{ ["--i" as string]: 1 }}>
              Reserve a <em className="acc">table.</em>
            </h1>
            <p className="rv__stand load" style={{ ["--i" as string]: 2 }}>
              Dinner nightly from 5:30pm, Tuesday to Sunday. Bar seats are
              walk-in only. For a table, book ahead below.
            </p>
            <div className="rv__cta load" style={{ ["--i" as string]: 3 }}>
              <BookingFlow />
              <p className="rv__note">
                Groups over eight or a private night go through{" "}
                <a href="mailto:events@ferrant.au">events@ferrant.au</a>.
              </p>
            </div>
          </div>

          <div className="rv__media load" style={{ ["--i" as string]: 2 }}>
            <AmbientVideo
              src="/video/cta-grill.mp4"
              poster="/img/meat-fire.jpg"
              className="rv__video"
              eager
            />
            <span className="chip rv__chip">Tuesday to Sunday, from 5:30pm</span>
            <MotionToggle className="rv__toggle" />
          </div>
        </div>
      </section>

      {/* contact row: a ruled grid, four details at equal weight */}
      <section className="contact" aria-label="How to find us">
        <div className="wrap">
          <dl className="contact__grid">
            <div className="contact__cell" data-rv="">
              <dt className="label">Where</dt>
              <dd>
                12 Sable Lane, Fitzroy.
                <span>The door is unmarked, on the left past the loading dock.</span>
              </dd>
            </div>
            <div className="contact__cell" data-rv="" style={{ ["--d" as string]: 1 }}>
              <dt className="label">Hours</dt>
              <dd>
                Tuesday to Sunday from 5:30pm.
                <span>Private events on Monday.</span>
              </dd>
            </div>
            <div className="contact__cell" data-rv="" style={{ ["--d" as string]: 2 }}>
              <dt className="label">Call</dt>
              <dd>
                <a href="tel:+61390426611">(03) 9042 6611</a>
              </dd>
            </div>
            <div className="contact__cell" data-rv="" style={{ ["--d" as string]: 3 }}>
              <dt className="label">Write</dt>
              <dd>
                <a href="mailto:hello@ferrant.au">hello@ferrant.au</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="map">
        <iframe
          title="Ferrant's neighbourhood, Fitzroy VIC 3065 (Sable Lane is a fictional street; this map is centred on real-world Fitzroy)"
          src="https://www.google.com/maps?q=-37.7975,144.9780&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
