"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Frame } from "@/components/Frame";
import { EnquiryFlow } from "@/components/EnquiryFlow";

type Fact = [string, string];

export function EventSpaceSection({
  id,
  imageSide,
  tag,
  heading,
  children,
  image,
  space,
  facts,
}: {
  id: string;
  imageSide: "left" | "right";
  tag: string;
  heading: string;
  children: ReactNode;
  image: { src: string; alt: string; light?: [string, string] };
  space: string;
  facts: Fact[];
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <section
      id={id}
      className="evrow wrap ev-anchor"
      data-image-side={imageSide}
    >
      <div className="evrow__text">
        <span className="evrow__tag">{tag}</span>
        <h2>{heading}</h2>
        <div className="evrow__desc">{children}</div>
      </div>

      <div className="evrow__media">
        <div className="flipcard" data-flipped={flipped}>
          <div className="flipcard__inner">
            <div className="flipcard__face flipcard__front">
              <Frame
                src={image.src}
                alt={image.alt}
                light={image.light}
                sizes="(min-width: 54rem) 50vw, 100vw"
              />
              <button
                type="button"
                className="flipcard__see"
                onClick={() => setFlipped(true)}
              >
                See more <span aria-hidden="true" />
              </button>
            </div>

            <div className="flipcard__face flipcard__back">
              <div className="flipcard__watermark" aria-hidden="true">
                <Image src="/img/ferrant-flame-mark.png" alt="" fill sizes="18rem" />
              </div>
              <button
                type="button"
                className="flipcard__close"
                onClick={() => setFlipped(false)}
                aria-label="Close"
              >
                Close
              </button>
              <ul className="evspec">
                {facts.map(([k, v]) => (
                  <li key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </li>
                ))}
              </ul>
              <div className="evspec__cta">
                <EnquiryFlow space={space} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
