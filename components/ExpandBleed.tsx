import Image from "next/image";

/**
 * Expand to full bleed (Phisio): an inset photo grows to fill the screen as
 * the section scrolls, then the headline pulls back onto it. Pinned while
 * it plays; with no scroll-driven animation support it is simply a
 * full-bleed photo band with the headline in place.
 */
export function ExpandBleed() {
  return (
    <section className="xb" aria-labelledby="xb-title">
      <div className="xb__pin">
        <div className="xb__frame">
          <Image
            src="/img/oven-fire.jpg"
            alt="Flames and embers inside the wood-fired hearth"
            fill
            sizes="100vw"
            className="xb__img"
          />
          <div className="xb__scrim" aria-hidden="true" />
        </div>
        <div className="wrap xb__copy">
          <p className="eyebrow xb__eyebrow">The rule</p>
          <h2 id="xb-title" className="xb__title">
            No flame, no <em className="acc">menu.</em>
          </h2>
          <p className="xb__line">
            There is no gas line and no combi oven in the back. One wood fire
            bakes the bread, sears the fish, chars the vegetables and finishes
            the dessert.
          </p>
        </div>
      </div>
    </section>
  );
}
