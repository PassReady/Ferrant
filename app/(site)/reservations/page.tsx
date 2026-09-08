import type { Metadata } from "next";
import Image from "next/image";
import { BookingFlow } from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Reserve a table",
  description:
    "Book a table at Ferrant, Fitzroy. Dinner nightly from 5:30pm, Tuesday to Sunday.",
};

export default function ReservationsPage() {
  return (
    <>
      <section className="wrap phead">
      <div className="resv">
        <div className="resv__lead">
          <h1>Reserve a table</h1>
          <p className="phead__sub">
            Dinner nightly from 5:30pm, Tuesday to Sunday. Bar seats are
            walk-in only &mdash; for a table, book ahead below.
          </p>
          <div className="resv__cta">
            <BookingFlow />
            <p className="dim">
              Large groups, or a private night, go through{" "}
              <a className="link" href="mailto:events@ferrant.au">
                events@ferrant.au
              </a>
              .
            </p>
          </div>

          <dl className="resv__facts">
            <div>
              <dt>Where</dt>
              <dd>
                12 Sable Lane, Fitzroy. The door is unmarked, on the left past
                the loading dock.
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>
                Dinner nightly from 5:30pm, Tuesday to Sunday. Private events
                on Monday.
              </dd>
            </div>
            <div>
              <dt>Reach us</dt>
              <dd>
                <a className="link" href="tel:+61390426611">
                  (03) 9042 6611
                </a>{" "}
                &nbsp;·&nbsp;{" "}
                <a className="link" href="mailto:hello@ferrant.au">
                  hello@ferrant.au
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="resv__logo">
          <Image
            src="/img/ferrant-flame-icon.png"
            alt="The Ferrant flame mark"
            width={508}
            height={773}
            sizes="(min-width: 54rem) 24rem, 70vw"
          />
        </div>
      </div>
      </section>

      <section className="resv__map">
        <iframe
          title="Ferrant's neighbourhood — Fitzroy VIC 3065 (Sable Lane is a fictional street; this map is centred on real-world Fitzroy)"
          src="https://www.google.com/maps?q=-37.7975,144.9780&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
