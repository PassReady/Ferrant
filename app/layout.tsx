import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-display",
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
      <body>{children}</body>
    </html>
  );
}
