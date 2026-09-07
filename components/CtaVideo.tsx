"use client";

import { useEffect, useRef } from "react";

/**
 * Looping background video for the reserve CTA band. Same play-retry
 * pattern as FireHero — muted autoplay isn't always self-triggering with
 * preload="auto" alone, so we nudge it on mount and again on tab focus.
 */
export function CtaVideo() {
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
      poster="/img/meat-fire.jpg"
      aria-hidden="true"
    >
      <source src="/video/cta-sear.mp4" type="video/mp4" />
    </video>
  );
}
