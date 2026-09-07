"use client";

import Link from "next/link";
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
const buyout = (
  <>
    <path d="M1.5 14.5V6l6.5-4.5L14.5 6v8.5" />
    <path d="M6 14.5v-5h4v5" />
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
        href: "/events#buyout",
        label: "The Buyout",
        blurb: "The whole room, to yourselves.",
        icon: buyout,
      },
    ],
  },
  {
    href: "/menu",
    label: "Menu",
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
  { href: "/reservations", label: "Reserve" },
  { href: "/admin", label: "Admin" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [solid, setSolid] = useState(!onHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onHome) {
      setSolid(true);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSolid(window.scrollY > window.innerHeight * 0.68);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [onHome]);

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

  const activeItem = items.find((it) => it.href === openId && it.mega);

  return (
    <header
      ref={headerRef}
      className={`nav${solid ? " nav--solid" : ""}${openId ? " nav--mega-open" : ""}`}
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="nav__in">
        <Link href="/" className="wordmark" onClick={() => setMobileOpen(false)}>
          Ferrant
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={mobileOpen}
          aria-controls="nav-list"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary">
          <ul id="nav-list" className="nav__list" data-open={mobileOpen}>
            {items.map((it) => {
              const current =
                pathname === it.href || pathname.startsWith(it.href + "/");
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
                    {it.label}
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
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* the mega panel — one full-width panel below the bar, not a
          per-item tooltip. Shown only while openId matches a mega item;
          closes on mouse leaving the header, on Escape, and on every
          route change (see the effect above). */}
      {activeItem && (
        <div className="mega" role="region" aria-label={`${activeItem.label} menu`}>
          <div className="wrap mega__grid" data-count={activeItem.mega!.length}>
            {activeItem.mega!.map((sub) => (
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
    </header>
  );
}
