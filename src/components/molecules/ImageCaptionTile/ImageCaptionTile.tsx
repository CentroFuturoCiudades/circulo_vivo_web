import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export interface ImageCaptionTileProps {
  image: StaticImageData | string;
  caption: string;
  className?: string;
}

/** Image tile with a dark gradient overlay and a bottom-anchored caption. */
export function ImageCaptionTile({ image, caption, className }: ImageCaptionTileProps) {
  return (
    <div className={cn("relative aspect-square overflow-hidden", className)}>
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%)" }}
      />
      <p className="absolute inset-x-3 bottom-3 font-sans font-semibold text-white text-[14px] leading-snug">
        {caption}
      </p>
    </div>
  );
}
