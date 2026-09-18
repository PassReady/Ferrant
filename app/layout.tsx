import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";
import "./booking.css";
import "./home.css";
import "./pages.css";

// display: one weight, italic for the single accent word per headline.
// closest open face to the classical capitals in the Ferrant logo.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

// body, labels, numerals. same superfamily as the display face.
const text = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-text",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ferrant.vercel.app"),
  title: {
    default: "Ferrant | One fire, every dish",
    template: "%s | Ferrant",
  },
  description:
    "A fire-cooking restaurant in Fitzroy. Everything on the menu is cooked over one wood fire. Dinner nightly, Tuesday to Sunday.",
  openGraph: {
    title: "Ferrant",
    description: "A fire-cooking restaurant in Fitzroy. One wood fire, every dish.",
    type: "website",
    images: [{ url: "/img/og-card.jpg", width: 1200, height: 630, alt: "Ferrant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferrant",
    description: "A fire-cooking restaurant in Fitzroy. One wood fire, every dish.",
    images: ["/img/og-card.jpg"],
  },
};

// Runs before paint. `js` gates every JS-driven reveal, so without
// JavaScript nothing is ever hidden. `seen` skips the home curtain: it only
// plays when the visit lands on the home page, once per session. `paused`
// restores the visitor's choice from the pause-motion control.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ferrant.curtain'))d.classList.add('seen');else if(location.pathname==='/')sessionStorage.setItem('ferrant.curtain','1');else d.classList.add('seen');if(localStorage.getItem('ferrant.motion')==='paused')d.dataset.motion='paused';}catch(e){d.classList.add('seen');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
