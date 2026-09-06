import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { Frame } from "@/components/Frame";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Booking enquiries and contact details for Ferrant, Fitzroy. One seating a night at 7pm, Wednesday to Saturday.",
};

export default function ContactPage() {
  return (
    <>
      <section className="wrap phead">
        <h1>Ask for a night</h1>
        <p className="phead__sub">
          Send us the date and the number and we&rsquo;ll be in touch within two
          days. There are twelve seats a night, so we can&rsquo;t always say yes
          to the first date &mdash; give us a second one if you can.
        </p>
      </section>

      <section className="wrap band" style={{ paddingTop: 0 }}>
        <div className="book-grid">
          <BookingForm />

          <aside className="details">
            <h2>The practical part</h2>

            <div className="details__block">
              <div className="k">Where</div>
              <div className="v">
                12 Sable Lane, Fitzroy
                <br />
                The door is unmarked, on the left past the loading dock. If you
                reach the car park you&rsquo;ve gone one too far.
              </div>
            </div>

            <div className="details__block">
              <div className="k">Hours</div>
              <div className="v">
                One seating, 7pm. Wednesday to Saturday.
                <br />
                Private events Sunday to Tuesday.
              </div>
            </div>

            <div className="details__block">
              <div className="k">Phone</div>
              <a className="v" href="tel:+61390426611">
                (03) 9042 6611
              </a>
            </div>

            <div className="details__block">
              <div className="k">Email</div>
              <a className="v" href="mailto:hello@ferrant.au">
                hello@ferrant.au
              </a>
              <br />
              <a className="v" href="mailto:events@ferrant.au">
                events@ferrant.au
              </a>{" "}
              <span className="dim">for private events</span>
            </div>

            <div className="details__frame">
              <Frame
                src="/img/door-warm.jpg"
                alt="The unmarked door on Sable Lane at night, one warm light above it"
                caption="Sable Lane, after dark."
                light={["40%", "40%"]}
                sizes="(min-width: 54rem) 26rem, 100vw"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
