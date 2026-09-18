import Link from "next/link";
import type { ReactNode } from "react";

export const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Inner markup shared by every call to action: label pill + arrow disc. */
export function BtnInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn__label">
        <span className="btn__roll" data-text={typeof children === "string" ? children : undefined}>
          {children}
        </span>
      </span>
      <span className="btn__disc">
        <Arrow />
      </span>
    </>
  );
}

/**
 * The split button: the site-wide call to action. `primary` is the one
 * action per screen (flame on dark, ember on the bone band); `ghost` is
 * the outline pill whose fill sweeps in on hover. Never a bare text link.
 */
export function Btn({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn--${variant} ${className}`}>
      <BtnInner>{children}</BtnInner>
    </Link>
  );
}
