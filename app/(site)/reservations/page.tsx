import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Reserve a table",
  description:
    "Book a table at Ferrant, Fitzroy. Dinner nightly from 5:30pm, Tuesday to Sunday.",
};

export default function ReservationsPage() {
  return (
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

        <Frame
          src="/img/door-warm.jpg"
          alt="The unmarked door on Sable Lane at night, one warm light above it"
          ratio="3 / 4"
          light={["40%", "40%"]}
          className="resv__img"
          sizes="(min-width: 54rem) 24rem, 100vw"
        />
      </div>
    </section>
  );
}
