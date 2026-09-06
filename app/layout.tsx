import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-display",
});

const text = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ferrant.au"),
  title: {
    default: "Ferrant — live fire, twelve seats, one seating",
    template: "%s — Ferrant",
  },
  description:
    "A chef's-table restaurant in Fitzroy built around one fire. Twelve seats, one seating a night, one menu that changes every week with the flame.",
  openGraph: {
    title: "Ferrant",
    description:
      "A chef's-table restaurant built around one fire. Twelve seats, one seating, one menu a week.",
    type: "website",
    images: ["/img/charcoal-fire.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
