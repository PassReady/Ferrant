import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MotionRoot } from "@/components/MotionRoot";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <MotionRoot />
    </>
  );
}
