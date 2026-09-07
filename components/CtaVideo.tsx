"use client";

import { useEffect, useRef } from "react";

/**
 * Looping background video for a full-width CTA band above the footer.
 * Same play-retry pattern as FireHero — muted autoplay isn't always
 * self-triggering with preload="auto" alone, so we nudge it on mount and
 * again on tab focus. Each footer CTA passes its own clip + poster so no
 * two bands (or the hero) repeat the same footage.
 */
export function CtaVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tryPlay = () => videoRef.current?.play().catch(() => {});
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, []);

  return (
    <video
      ref={videoRef}
      className="callout__video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
