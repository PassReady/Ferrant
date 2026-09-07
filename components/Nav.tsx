"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Item = {
  href: string;
  label: string;
  blurb: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    href: "/story",
    label: "Our Story",
    blurb: "One fire, lit before anyone arrives",
    icon: (
      <path d="M8 1.5c1.7 2 2.4 3.5 2.4 5A2.4 2.4 0 0 1 8 13.9a2.4 2.4 0 0 1-2.4-2.4c0-.9.4-1.7 1-2.4-.1 1 .4 1.8 1.1 1.8.6 0 1-.5 1-1.3 0-1.8-1.4-3.3-1.7-5.6C6.3 2.7 7 2 8 1.5Z" />
    ),
  },
  {
    href: "/events",
    label: "Event Spaces",
    blurb: "The room, or the counter, to yourselves",
    icon: (
      <>
        <rect x="1.75" y="4" width="12.5" height="8.5" rx="1" />
        <path d="M4.5 4V2.5M11.5 4V2.5M1.75 7.25h12.5" />
      </>
    ),
  },
  {
    href: "/menu",
    label: "Menu",
    blurb: "Eight courses, new every Wednesday",
    icon: (
      <>
        <path d="M4 1.5v6M4 7.5v7M2.5 1.5v3a1.5 1.5 0 0 0 3 0v-3" />
        <path d="M11.5 1.5c-1.4 0-2 1.8-2 4s.9 3 2 3 2-.8 2-3-.6-4-2-4ZM11.5 8.5v6" />
      </>
    ),
  },
  {
    href: "/reservations",
    label: "Reserve",
    blurb: "Twelve seats, one seating a night",
    icon: (
      <>
        <rect x="1.75" y="3" width="12.5" height="11" rx="1.25" />
        <path d="M1.75 6h12.5M5 1.5V4M11 1.5V4" />
      </>
    ),
  },
  {
    href: "/admin",
    label: "Admin",
    blurb: "The demo backend — take a look",
    icon: (
      <>
        <circle cx="8" cy="8" r="2.25" />
        <path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8 3.4 3.4" />
      </>
    ),
  },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [solid, setSolid] = useState(!onHome);
  const [open, setOpen] = useState(false);

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

  return (
    <header className={`nav${solid ? " nav--solid" : ""}`}>
      <div className="nav__in">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
          Ferrant
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-list"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary">
          <ul id="nav-list" className="nav__list" data-open={open}>
            {items.map((it) => {
              const current =
                pathname === it.href || pathname.startsWith(it.href + "/");
              return (
                <li key={it.href} className="nav__item">
                  <Link
                    href={it.href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </Link>
                  <span className="nav__reveal" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {it.icon}
                    </svg>
                    {it.blurb}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
