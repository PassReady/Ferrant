import Image from "next/image";

/**
 * The home page's opening curtain. Entirely CSS: the flame mark brightens,
 * then the curtain lifts at 1.1s and is gone by 1.9s, whatever the script
 * is doing, so it can never strand the page (the AOMI defect). Hidden once
 * seen this session, and never shown under reduced motion.
 */
export function Curtain() {
  return (
    <div className="curtain" aria-hidden="true">
      <div className="curtain__mark">
        <Image src="/img/ferrant-flame-icon.png" alt="" width={508} height={773} priority />
      </div>
    </div>
  );
}
