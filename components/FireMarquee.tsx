const WORDS = ["WOOD FIRE", "CHARRED", "SMOKED", "EMBER", "FLAME"];

/**
 * A short, rhythm-breaking strip between the two home sections — not a
 * section of its own, just a beat of continuous motion between two very
 * different static treatments (pinned sequence, full-bleed card).
 */
// each segment must be wider than any realistic viewport, or the
// two-copy/-50% loop runs out of content and shows blank space before
// the second copy scrolls into view — repeating the word list several
// times per segment guarantees that regardless of screen width or
// font-size
const REPEATS = 6;

export function FireMarquee() {
  const line = Array(REPEATS).fill(WORDS.join(" · ")).join(" · ") + " · ";
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__seg">{line}</span>
        <span className="marquee__seg">{line}</span>
      </div>
    </div>
  );
}
