import type { Metadata } from "next";
import { MenuScroller } from "@/components/MenuScroller";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "This week's tasting menu at Ferrant — eight courses, all cooked over one fire. Set price, with an optional wine pairing.",
};

export default function MenuPage() {
  return <MenuScroller />;
}
