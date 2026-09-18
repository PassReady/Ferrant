import type { ReactNode } from "react";
import { AmbientVideo } from "@/components/AmbientVideo";
import { MotionToggle } from "@/components/MotionToggle";
import { Embers } from "@/components/Embers";

/**
 * The booking close at the foot of every page: looping footage faded to
 * ground top and bottom, a pull-back headline, embers rising through it.
 * The one treatment repeated site-wide, by design (spec sheet §4).
 */
export function CloseBand({
  video,
  poster,
  eyebrow,
  title,
  accent,
  children,
}: {
  video: string;
  poster: string;
  eyebrow: string;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="close" aria-label={`${title} ${accent}`}>
      <div className="close__media">
        <AmbientVideo src={video} poster={poster} className="close__video" />
      </div>
      <div className="close__scrim" aria-hidden="true" />
      <Embers />
      <div className="wrap close__in">
        <p className="eyebrow" data-rv="">{eyebrow}</p>
        <h2 className="close__title">
          {title} <em className="acc">{accent}</em>
        </h2>
        <div className="close__act" data-rv="" style={{ ["--d" as string]: 1 }}>
          {children}
        </div>
      </div>
      <MotionToggle className="close__toggle" />
    </section>
  );
}
