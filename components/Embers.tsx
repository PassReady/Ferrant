/**
 * Ember particles rising through a close band. Pure CSS, deterministic
 * positions (no Math.random, so server and client markup match). Paused by
 * the pause-motion control, removed for reduced motion.
 */
const N = 18;
export function Embers() {
  return (
    <div className="embers" aria-hidden="true">
      {Array.from({ length: N }, (_, i) => {
        const x = (i * 37 + 11) % 100;
        const d = 7 + ((i * 13) % 9);
        const delay = -((i * 1.7) % d);
        const size = 2 + ((i * 7) % 4);
        const drift = ((i * 29) % 60) - 30;
        return (
          <span
            key={i}
            style={{
              left: `${x}%`,
              width: size,
              height: size,
              animationDuration: `${d}s`,
              animationDelay: `${delay.toFixed(1)}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
