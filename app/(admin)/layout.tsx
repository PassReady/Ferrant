import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return <div className="admin">{children}</div>;
}
