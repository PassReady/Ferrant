const WORDS = ["WOOD FIRE", "CHARRED", "SMOKED", "EMBER", "FLAME"];

/**
 * A short, rhythm-breaking strip between the two home sections — not a
 * section of its own, just a beat of continuous motion between two very
 * different static treatments (pinned sequence, full-bleed card).
 */
export function FireMarquee() {
  const line = WORDS.join(" · ") + " · ";
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__seg">{line}</span>
        <span className="marquee__seg">{line}</span>
      </div>
    </div>
  );
}
