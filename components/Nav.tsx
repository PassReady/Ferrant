"use client";

import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/Btn";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SubItem = {
  href: string;
  label: string;
  blurb: string;
  icon: ReactNode;
};

type Item = {
  href: string;
  label: string;
  /** small pill after the label — marks the open demo backend */
  tag?: string;
  mega?: SubItem[];
};

const forkKnife = (
  <>
    <path d="M4 1.5v6M4 7.5v7M2.5 1.5v3a1.5 1.5 0 0 0 3 0v-3" />
    <path d="M11.5 1.5c-1.4 0-2 1.8-2 4s.9 3 2 3 2-.8 2-3-.6-4-2-4ZM11.5 8.5v6" />
  </>
);
const calendar = (
  <>
    <rect x="1.75" y="3" width="12.5" height="11" rx="1.25" />
    <path d="M1.75 6h12.5M5 1.5V4M11 1.5V4" />
  </>
);
const counter = (
  <>
    <path d="M1.5 11.5h13M2.5 11.5V6.5l3-3.5h5l3 3.5v5" />
    <path d="M6 14.5v-3h4v3" />
  </>
);
const room = (
  <>
    <rect x="1.75" y="4" width="12.5" height="8.5" rx="1" />
    <path d="M4.5 4V2.5M11.5 4V2.5M1.75 7.25h12.5" />
  </>
);
const longTable = (
  <>
    <rect x="1" y="6.5" width="14" height="2.5" rx="0.5" />
    <path d="M3 9v3.5M13 9v3.5M3 6.5V3M13 6.5V3" />
  </>
);

const items: Item[] = [
  { href: "/story", label: "Our Story" },
  {
    href: "/events",
    label: "Event Spaces",
    mega: [
      {
        href: "/events#chefs-table",
        label: "The Chef's Table",
        blurb: "Up to six, right at the counter.",
        icon: counter,
      },
      {
        href: "/events#fireside-room",
        label: "The Fireside Room",
        blurb: "A private room, its own hearth.",
        icon: room,
      },
      {
        href: "/events#long-table",
        label: "The Long Table",
        blurb: "Ten to sixteen, in the main room.",
        icon: longTable,
      },
    ],
  },
  {
    href: "/menu",
    label: "Restaurant",
    mega: [
      {
        href: "/menu",
        label: "Full Menu",
        blurb: "Bites through to dessert, cooked over one fire.",
        icon: forkKnife,
      },
      {
        href: "/reservations",
        label: "Reserve a Table",
        blurb: "Book your night at Ferrant.",
        icon: calendar,
      },
    ],
  },
  { href: "/admin", label: "Admin", tag: "Demo" },
];

export function Nav() {
  const pathname = usePathname();
  // pages that open on a full photo or footage hero: the bar sits clear
  // over it, then turns to frosted glass once the page moves
  const overHero = ["/", "/story", "/menu", "/events"].includes(pathname);
  const [solid, setSolid] = useState(!overHero);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!overHero) {
      setSolid(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSolid(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [overHero]);

  // the mega panel and the mobile drawer must never survive a navigation —
  // this is what kept the old hover dropdown open on every page
  useEffect(() => {
    setOpenId(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <header
      ref={headerRef}
      className={`nav${solid ? " nav--solid" : ""}${openId ? " nav--mega-open" : ""}`}
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="nav__in">
        <Link href="/" className="wordmark" onClick={() => setMobileOpen(false)} aria-label="Ferrant, home">
          <Image src="/img/ferrant-flame-icon.png" alt="" width={508} height={773} className="wordmark__icon" priority />
          <span>Ferrant</span>
        </Link>

        <div className="nav__right">
          <nav aria-label="Primary">
            <ul id="nav-list" className="nav__list" data-open={mobileOpen}>
            {items.map((it) => {
              const current =
                pathname === it.href ||
                pathname.startsWith(it.href + "/") ||
                (it.mega?.some((sub) => pathname === sub.href.split("#")[0]) ??
                  false);
              return (
                <li
                  key={it.href}
                  className="nav__item"
                  onMouseEnter={() => it.mega && setOpenId(it.href)}
                >
                  <Link
                    href={it.href}
                    aria-current={current ? "page" : undefined}
                    aria-expanded={it.mega ? it.href === openId : undefined}
                    onClick={(e) => {
                      // touch/keyboard: first tap opens the panel instead of
                      // navigating straight past it
                      if (
                        it.mega &&
                        openId !== it.href &&
                        matchMedia("(hover: none) and (min-width: 46.01rem)").matches
                      ) {
                        e.preventDefault();
                        setOpenId(it.href);
                        return;
                      }
                      setMobileOpen(false);
                    }}
                  >
                    <span className="roll" aria-hidden="true">
                      {it.label.split("").map((ch, i) => (
                        <span key={i} className="roll__ch" data-ch={ch === " " ? " " : ch} style={{ ["--ci" as string]: i }}>
                          {ch === " " ? " " : ch}
                        </span>
                      ))}
                    </span>
                    <span className="sr-only">{it.label}</span>
                    {it.tag && <span className="nav__tag">{it.tag}</span>}
                  </Link>

                  {/* mobile-only: sub-items shown inline, no hover available */}
                  {it.mega && (
                    <div className="nav__subinline" aria-hidden={!mobileOpen}>
                      {it.mega.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="nav__subinline-item"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* the mega panel — a compact dropdown anchored to this
                      specific item (position:relative on .nav__item), not
                      a shared panel pinned to one edge of the header.
                      Shown only while openId matches this item; closes on
                      mouse leaving the header, on Escape, and on every
                      route change (see the effect above). */}
                  {it.mega && it.href === openId && (
                    <div className="mega" role="region" aria-label={`${it.label} menu`}>
                      <div className="mega__grid">
                        {it.mega.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="mega__item"
                            onClick={() => setOpenId(null)}
                          >
                            <svg
                              className="mega__icon"
                              viewBox="0 0 16 16"
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {sub.icon}
                            </svg>
                            <span className="mega__label">{sub.label}</span>
                            <span className="mega__blurb">{sub.blurb}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            </ul>
          </nav>

          <a
            href="https://instagram.com/ferrant.fitzroy"
            target="_blank"
            rel="noopener noreferrer"
            className="nav__insta"
            aria-label="Ferrant on Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <Link
            href="/reservations?book=1"
            className="btn btn--primary btn--sm nav__book"
            onClick={() => setMobileOpen(false)}
          >
            <span className="btn__label"><span className="btn__roll" data-text="Reserve">Reserve</span></span>
            <span className="btn__disc"><Arrow /></span>
          </Link>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="nav-list"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="nav__burger" data-open={mobileOpen}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
