"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMenu } from "@/lib/store";

export function MenuScroller() {
  const menu = useMenu();
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the panel's vertical centre
        let best = -1;
        let bestDist = Infinity;
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.i);
          if (!e.isIntersecting) return;
          const mid = e.boundingClientRect.top + e.boundingClientRect.height / 2;
          const dist = Math.abs(mid - window.innerHeight / 2);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        if (best >= 0) setActive(best);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.5, 1] },
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [menu.dishes.length]);

  return (
    <div className="menu2">
      <div className="menu2__grid">
        {/* sticky crossfading image panel */}
        <div className="menu2__panel" aria-hidden="true">
          <div className="menu2__panel-inner">
            {menu.dishes.map((d, i) => (
              <Image
                key={d.id}
                src={d.image}
                alt=""
                fill
                sizes="(min-width: 60rem) 46vw, 100vw"
                priority={i === 0}
                className="menu2__img"
                data-active={i === active ? "true" : "false"}
              />
            ))}
            <span className="frame__grade" />
            <span className="menu2__count">
              {String(active + 1).padStart(2, "0")}
              <i>/</i>
              {String(menu.dishes.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* the list */}
        <ol className="menu2__list">
          <li className="menu2__head">
            <h1>The Menu</h1>
            <p className="menu2__stamp">
              <span>{menu.week}</span>
              <i aria-hidden="true">/</i>
              <span>changes every Wednesday</span>
              <i aria-hidden="true">/</i>
              <span>{menu.priceNote}</span>
            </p>
          </li>

          {menu.dishes.map((d, i) => (
            <li
              key={d.id}
              className="menu2__row"
              data-active={i === active ? "true" : "false"}
              data-dist={Math.min(3, Math.abs(i - active))}
              data-i={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
            >
              <div className="menu2__mobimg">
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="100vw"
                  className="menu2__img"
                />
                <span className="frame__grade" />
              </div>
              <h2>{d.name}</h2>
              <p>{d.description}</p>
              {d.price ? <span className="menu2__price">{d.price}</span> : null}
            </li>
          ))}

          <li className="menu2__foot">
            <h2>With wine</h2>
            <p>{menu.wine}</p>
            <p className="dim menu2__note">
              The whole room eats the same thing on the same night. Tell us about
              allergies when you book — there&rsquo;s no separate menu, but
              there&rsquo;s almost always a way.
            </p>
            <Link href="/reservations" className="act">
              Reserve a table
            </Link>
          </li>
        </ol>
      </div>
    </div>
  );
}
