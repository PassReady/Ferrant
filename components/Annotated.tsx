import Image from "next/image";

// points and chips are percentages of a fixed 2:3 frame, so they never
// drift as the photo scales. Chips sit on the dark hood and floor.
const NOTES = [
  { n: 1, label: "The pass", text: "Faces straight into the room. No wall between the fire and the tables.", pt: [34, 31], chip: [6, 9] },
  { n: 2, label: "The grill", text: "Raised and lowered over the coals by hand, on that wheel.", pt: [95, 28.5], chip: [54, 6] },
  { n: 3, label: "The hearth", text: "Lit at dawn. Everything on the menu passes through here.", pt: [95, 40], chip: [52, 70] },
  { n: 4, label: "The counter", text: "Six seats, front row. The Chef's Table on a Monday.", pt: [66, 55], chip: [8, 82] },
];

/**
 * Annotated image (Hyperfit, Fringe): the open kitchen with four callouts
 * on leader lines that draw themselves as the photo scrolls through. At
 * mobile the chips collapse to numbered dots and the list carries the
 * words.
 */
export function Annotated() {
  return (
    <section className="an" aria-labelledby="an-title">
      <span className="grain" aria-hidden="true" />
      <div className="wrap an__grid">
        <figure className="an__fig">
          <div className="an__frame">
            <Image
              src="/img/chefs-table-kitchen.jpg"
              alt="The open kitchen at night: the pass, the grill and the hearth behind the counter seats"
              fill
              sizes="(min-width: 900px) 42vw, 100vw"
            />
            <svg className="an__lines" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
              {NOTES.map((a) => (
                <line
                  key={a.n}
                  x1={a.pt[0]}
                  y1={a.pt[1] * 1.5}
                  x2={a.chip[0] + 3}
                  y2={a.chip[1] * 1.5 + 3}
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {NOTES.map((a) => (
              <span
                key={a.n}
                className="an__pt"
                style={{ left: `${a.pt[0]}%`, top: `${a.pt[1]}%` }}
                aria-hidden="true"
              />
            ))}
            {NOTES.map((a) => (
              <span
                key={a.n}
                className="an__chip"
                style={{ left: `${a.chip[0]}%`, top: `${a.chip[1]}%` }}
                aria-hidden="true"
              >
                <span className="an__num tnum">{a.n}</span>
                <span className="an__label">{a.label}</span>
              </span>
            ))}
          </div>
        </figure>

        <div className="an__copy">
          <p className="eyebrow" data-rv="">The room</p>
          <h2 id="an-title" className="an__title" data-rv="" style={{ ["--d" as string]: 1 }}>
            Something you watch as much as <em className="acc">eat.</em>
          </h2>
          <p className="an__lead" data-rv="" style={{ ["--d" as string]: 2 }}>
            An open kitchen with the pass facing straight into the room: the
            flare when fat hits the coals, the bread coming off the stones, the
            last plate of the night going out.
          </p>
          <ol className="an__list">
            {NOTES.map((a, i) => (
              <li key={a.n} data-rv="" style={{ ["--d" as string]: i * 0.5 }}>
                <span className="an__num tnum">{a.n}</span>
                <div>
                  <h3>{a.label}</h3>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
