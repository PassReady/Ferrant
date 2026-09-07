import type { Metadata } from "next";
import { MenuBoard } from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The à la carte menu at Ferrant — bites through to dessert, everything cooked over one wood fire.",
};

export default function MenuPage() {
  return <MenuBoard />;
}
