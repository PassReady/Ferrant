import type { Metadata } from "next";
import { Zilla_Slab, Space_Grotesk, Special_Elite, Niconne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// headings — a heavy, worked slab. reads as fire and iron, not wine bar.
const display = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

// home page only — scoped in globals.css via .home, not used site-wide.
// body copy stays Space Grotesk; headings/title use Special Elite (below);
// the chef quote uses Niconne (below) — three separate overrides, not one.
const homeFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-home",
});

const homeDisplay = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-home-display",
});

const quoteFont = Niconne({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-quote",
});

const text = localFont({
  src: [
    { path: "./fonts/GeneralSans-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ferrant.vercel.app"),
  title: {
    default: "Ferrant — one fire, every dish",
    template: "%s — Ferrant",
  },
  description:
    "A fire-cooking restaurant in Fitzroy. Everything on the menu is cooked over one wood fire. Dinner nightly, Tuesday to Sunday.",
  openGraph: {
    title: "Ferrant",
    description:
      "A fire-cooking restaurant in Fitzroy — bites through to dessert, cooked over one wood fire. Dinner nightly.",
    type: "website",
    images: ["/img/charcoal-fire.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${text.variable} ${homeFont.variable} ${homeDisplay.variable} ${quoteFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
