import Image from "next/image";
import type { CSSProperties } from "react";

type FrameProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  /** aspect ratio of the frame, e.g. "16 / 9". Defaults to CSS. */
  ratio?: string;
  /** position of the warm light source in the grade, e.g. ["72%", "34%"] */
  light?: [x: string, y: string];
  /** object-position for the photo inside the frame */
  position?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Every photograph on the site passes through Frame so the grade is identical:
 * darkened, warm-shifted, vignetted toward black with one warm light source.
 */
export function Frame({
  src,
  alt,
  caption,
  priority,
  sizes = "100vw",
  ratio,
  light = ["68%", "34%"],
  position = "center",
  className = "",
  style,
}: FrameProps) {
  return (
    <figure className={className} style={style}>
      <div
        className="frame"
        style={ratio ? ({ aspectRatio: ratio } as CSSProperties) : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover", objectPosition: position }}
        />
        <span
          className="frame__grade"
          style={
            { "--light-x": light[0], "--light-y": light[1] } as CSSProperties
          }
          aria-hidden="true"
        />
      </div>
      {caption ? <figcaption className="frame__cap">{caption}</figcaption> : null}
    </figure>
  );
}
