import { cn } from "@/lib/utils";

export interface CTABannerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export function CTABanner({
  title,
  subtitle,
  action,
  backgroundImage,
  className,
}: CTABannerProps) {
  return (
    <div
      className={cn("w-full", className)}
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url(${backgroundImage})`
          : undefined,
        backgroundColor: backgroundImage ? undefined : "rgba(0,0,0,0.5)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Inner container — max-width 1216, centered, padding 80 */}
      <div
        className="mx-auto flex items-center justify-between gap-8"
        style={{ maxWidth: "1216px", padding: "80px" }}
      >
        {/* Left: title + subtitle */}
        <div className="flex flex-col gap-3" style={{ maxWidth: "544px" }}>
          <h2
            className="font-sans font-semibold text-white leading-[1.2]"
            style={{ fontSize: "32px", letterSpacing: "-0.32px" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="font-sans font-normal text-white leading-[1.6]"
              style={{ fontSize: "18px" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: action */}
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}
