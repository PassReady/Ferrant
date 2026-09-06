"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * The one orchestrated motion moment on the site.
 * On load the room sits dark and cool; over ~1.4s the fire comes up —
 * the warm glow rises and settles into a slow breath, the image warms,
 * the wordmark resolves out of the shadow. Then everything is still.
 * prefers-reduced-motion: loads already lit, no breath.
 */
export function FireHero() {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setLit(true)),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`hero${lit ? " is-lit" : ""}`} aria-label="Ferrant">
      <div className="hero__bg">
        <Image
          src="/img/charcoal-fire.jpg"
          alt="A grill over open flame in a dark room"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner">
        <h1 className="hero__word">Ferrant</h1>
        <p className="hero__line">
          Twelve seats around one fire. One menu a night, cooked in flame, ember
          and smoke.
        </p>
        <div className="hero__meta">
          <span>Twelve seats</span>
          <span>One seating, 7pm</span>
          <span>Fitzroy</span>
        </div>
      </div>
    </section>
  );
}
