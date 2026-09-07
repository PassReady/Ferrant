"use client";

import { useEffect, useRef, useState } from "react";

const WORD = "Ferrant".split("");

export function FireHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoLayer = useRef<HTMLDivElement>(null);
  const contentLayer = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // fires even in a background tab, so the hero always resolves
    const t = setTimeout(() => setLit(true), 80);
    const tryPlay = () => videoRef.current?.play().catch(() => {});
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, []);

  // parallax — video and content move at different rates while the hero is in view
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = sectionRef.current?.offsetHeight ?? window.innerHeight;
        if (y > h) return; // hero out of view, stop updating
        if (videoLayer.current) {
          videoLayer.current.style.transform = `translate3d(0, ${y * 0.32}px, 0) scale(1.06)`;
        }
        if (contentLayer.current) {
          contentLayer.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
          contentLayer.current.style.opacity = String(
            Math.max(0, 1 - y / (h * 0.75)),
          );
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero${lit ? " is-lit" : ""}`}
      aria-label="Ferrant"
    >
      <div className="hero__bg" ref={videoLayer}>
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/charcoal-fire.jpg"
        >
          <source src="/video/hero-fire.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner" ref={contentLayer}>
        <h1 className="hero__word" aria-label="Ferrant">
          {WORD.map((ch, i) => (
            <span
              key={i}
              className="hero__char"
              style={{ ["--i" as string]: i }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </h1>
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

      <span className="hero__cue" aria-hidden="true">
        Scroll
      </span>
    </section>
  );
}
