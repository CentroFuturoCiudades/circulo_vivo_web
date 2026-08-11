import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

export interface DownloadBannerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  onDownload?: () => void;
  className?: string;
}

export function DownloadBanner({
  title = "Descarga la Infografía",
  description = "Obtén el reporte completo de resiliencia en salud de México. Incluye indicadores nacionales, rankings por estado, análisis de dispersión y mapas geográficos detallados.",
  ctaLabel = "Descargar",
  imageUrl,
  imageAlt = "",
  onDownload,
  className,
}: DownloadBannerProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden",
        "shadow-[0_1px_1.75px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <div className="flex items-center gap-6 p-6">

        {/* Thumbnail */}
        {imageUrl && (
          <div
            className="shrink-0 rounded-[10px] overflow-hidden border-2 border-[#e5e7eb]"
            style={{ width: 192, height: 128 }}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Heading row */}
          <div className="flex items-center gap-3">
            <Download size={24} className="text-[#708b8d] shrink-0" strokeWidth={2} />
            <h3
              className="font-serif font-bold text-[#1c1c18]"
              style={{ fontSize: 24, lineHeight: 1.4 }}
            >
              {title}
            </h3>
          </div>

          {/* Body */}
          <p
            className="font-sans font-medium text-[#6b7280] mt-2"
            style={{ fontSize: 14, lineHeight: 1.43 }}
          >
            {description}
          </p>
        </div>

        {/* CTA */}
        <div
          className="shrink-0 flex flex-col justify-end items-end self-stretch"
          style={{ width: 118 }}
        >
          <Button
            color="teal"
            variant="primary"
            onClick={onDownload}
            className="w-full normal-case tracking-normal font-semibold rounded-[10px] h-auto py-3 px-6"
            style={{ fontSize: 14 }}
          >
            {ctaLabel}
          </Button>
        </div>

      </div>
    </div>
  );
}
