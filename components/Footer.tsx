import Link from "next/link";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__grid">
        <div>
          <div className="foot__mark">Ferrant</div>
          <p className="dim" style={{ marginTop: "0.9rem", maxWidth: "30ch" }}>
            One fire, every dish. Fitzroy, dinner nightly.
          </p>
        </div>

        <div>
          <h4>Find us</h4>
          <p>
            12 Sable Lane
            <br />
            Fitzroy VIC 3065
          </p>
          <a href="tel:+61390426611">(03) 9042 6611</a>
          <a href="mailto:hello@ferrant.au">hello@ferrant.au</a>
        </div>

        <div>
          <h4>Hours</h4>
          <p className="dim">Dinner nightly from 5:30pm</p>
          <p className="dim">Tuesday to Sunday</p>
          <p className="dim">Private events on Monday</p>
          <Link href="/reservations" className="link" style={{ marginTop: "0.9rem", display: "inline-block" }}>
            Book a night
          </Link>
        </div>
      </div>

      <div className="foot__base">
        <span>Ferrant, Fitzroy. A fictional restaurant, built as a design demo.</span>
        <span>Instagram</span>
      </div>
    </footer>
  );
}
