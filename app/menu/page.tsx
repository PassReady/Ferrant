import type { Metadata } from "next";
import Link from "next/link";
import { courses, menuWeek, menuPrice } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "This week's tasting menu at Ferrant — eight courses, all cooked over one fire. Set price, with an optional wine pairing.",
};

export default function MenuPage() {
  return (
    <div className="wrap band">
      <div className="menu-doc">
        <header className="menu-doc__head">
          <h1>The Menu</h1>
          <p className="menu-doc__stamp">
            <span>{menuWeek}</span>
            <i aria-hidden="true">/</i>
            <span>changes every Wednesday</span>
            <i aria-hidden="true">/</i>
            <span>{menuPrice}</span>
          </p>
        </header>

        <div>
          {courses.map((c) => (
            <article className="course" key={c.name}>
              <h2 className="course__name">{c.name}</h2>
              <p className="course__how">{c.how}</p>
            </article>
          ))}
        </div>

        <hr className="menu-mark" aria-hidden="true" />

        <section className="menu-wine">
          <h2>With wine</h2>
          <p>
            Six glasses poured against the courses, chosen by our floor and
            built to sit next to smoke &mdash; some local, some not. An extra{" "}
            <strong>$95</strong> a head.
          </p>
          <p>
            A shorter three-glass pour is <strong>$55</strong>. Or we&rsquo;ll
            pour by the glass all night if you&rsquo;d rather choose as you go
            &mdash; the list is short and it&rsquo;s on the table when you sit
            down.
          </p>
        </section>

        <p className="menu-note">
          The whole room eats the same thing on the same night. Tell us about
          allergies and what someone won&rsquo;t eat when you book and
          we&rsquo;ll cook around it where we can &mdash; there&rsquo;s no
          separate menu, but there&rsquo;s almost always a way. A few courses
          contain dairy, shellfish and gluten; ask and we&rsquo;ll walk you
          through it.
        </p>

        <p className="center" style={{ marginTop: "2.5rem" }}>
          <Link href="/contact" className="act">
            Booking enquiry
          </Link>
        </p>
      </div>
    </div>
  );
}
