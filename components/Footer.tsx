import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/Btn";

/**
 * Wordmark footer (Phisio), sized to the brand: hours in the top row, the
 * brass wordmark beside its line, a ruled grid of links, and the contact
 * row at equal weight.
 */
export function Footer() {
  return (
    <footer className="foot">
      <span className="grain" aria-hidden="true" />
      <div className="wrap">
        <div className="foot__hours" data-rv="">
          <span className="label">Hours</span>
          <p>Dinner nightly from 5:30pm, Tuesday to Sunday</p>
          <p>Private events on Monday</p>
          <Link href="/reservations?book=1" className="btn btn--primary btn--sm">
            <span className="btn__label"><span className="btn__roll" data-text="Reserve">Reserve</span></span>
            <span className="btn__disc"><Arrow /></span>
          </Link>
        </div>

        <div className="foot__brand">
          <Image src="/img/ferrant-flame-icon.png" alt="" width={508} height={773} className="foot__logo" />
          <p className="foot__word split" data-split="" aria-label="Ferrant">
            {"FERRANT".split("").map((ch, i) => (
              <span className="w" key={i} aria-hidden="true">
                <span className="w__in" style={{ ["--wi" as string]: i }}>{ch}</span>
              </span>
            ))}
          </p>
          <p className="foot__line">One fire, every dish.<br />Fitzroy, dinner nightly.</p>
        </div>

        <div className="foot__grid">
          <div className="foot__cell">
            <span className="label">Visit</span>
            <p>12 Sable Lane<br />Fitzroy VIC 3065</p>
          </div>
          <div className="foot__cell">
            <span className="label">Call</span>
            <a href="tel:+61390426611">(03) 9042 6611</a>
          </div>
          <div className="foot__cell">
            <span className="label">Write</span>
            <a href="mailto:hello@ferrant.au">hello@ferrant.au</a>
            <a href="mailto:events@ferrant.au">events@ferrant.au</a>
          </div>
          <nav className="foot__cell" aria-label="Footer">
            <span className="label">Pages</span>
            <Link href="/menu">Menu</Link>
            <Link href="/story">Our story</Link>
            <Link href="/events">Event spaces</Link>
            <Link href="/reservations">Reservations</Link>
          </nav>
        </div>

        <div className="foot__base">
          <span>Ferrant, Fitzroy. A fictional restaurant, built as a design demo by Graphicl.</span>
          <a className="chip chip--link" href="https://instagram.com/ferrant.fitzroy" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
