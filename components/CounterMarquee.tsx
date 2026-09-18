/**
 * Counter-scrolling marquees (Visionary): two rows of display type pulled
 * in opposite directions by the reader's scroll, never on their own. Each
 * track holds four copies and travels exactly one, so neither end shows a
 * gap. Without support the rows sit still.
 */
const A = "wood fire · charred · smoked · ";
const B = "ember · flame · ash · ";

export function CounterMarquee() {
  return (
    <section className="cm" aria-label="Wood fire, charred, smoked, ember, flame, ash">
      <div className="cm__row" aria-hidden="true">
        <div className="cm__track cm__track--a">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>{A}</span>
          ))}
        </div>
      </div>
      <div className="cm__row" aria-hidden="true">
        <div className="cm__track cm__track--b">
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>{B}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
