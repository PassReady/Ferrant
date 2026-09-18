/**
 * Scroll-scrubbed text: each word changes colour from dim to lit as the
 * paragraph crosses the viewport. Colour only, never opacity, so the copy
 * is always readable. Words get a start/end slice of the paragraph's view
 * timeline; without scroll-driven animation support they simply render lit.
 */
export function Scrub({
  text,
  accent = [],
  className = "",
  as: Tag = "p",
}: {
  text: string;
  /** words (exact, including punctuation) to set in the italic accent */
  accent?: string[];
  className?: string;
  as?: "p" | "h1" | "h2" | "blockquote";
}) {
  const words = text.split(/\s+/).filter(Boolean);
  const n = words.length;
  return (
    <Tag className={`scrub ${className}`}>
      {words.map((w, i) => {
        // spread the words across 0–70% of the timeline, each lighting
        // over a short overlapping slice so the highlight reads as a wave
        const s = (i / n) * 70;
        return (
          <span
            key={i}
            className={accent.includes(w) ? "scrub__w acc" : "scrub__w"}
            style={{ ["--s" as string]: `${s.toFixed(1)}%`, ["--e" as string]: `${(s + 12).toFixed(1)}%` }}
          >
            {w}{i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
