"use client";
import { cn } from "@/lib/utils";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavBarProps {
  links: NavLink[];
  logo?: React.ReactNode;
  action?: React.ReactNode;

  // ── Appearance — editable per-instance ────────────────
  /** Hex for bar background. Default: #708b8d */
  bgColor?: string;
  /** 0-100 opacity for bar background. Default: 50 */
  bgOpacity?: number;
  /** Enable backdrop blur 3.5px. Default: true */
  blur?: boolean;
  /** Hex for active pill bg. Default: #708b8d */
  activeLinkColor?: string;
  /** 0-100 opacity for active pill bg. Default: 100 */
  activeLinkOpacity?: number;
  /** Hex for active link text. Default: #ffffff */
  activeLinkTextColor?: string;
  /** Hex for inactive link text. Default: #000000 */
  linkTextColor?: string;
  /** Hex for nav pill container bg. Default: #ffffff */
  pillBgColor?: string;
  /** 0-100 opacity for nav pill container. Default: 90 */
  pillBgOpacity?: number;

  fixed?: boolean;
  className?: string;
}

function toRgba(hex: string, opacity: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${(opacity / 100).toFixed(3)})`;
}

export function NavBar({
  links,
  logo,
  action,
  bgColor             = "#708b8d",
  bgOpacity           = 50,
  blur                = true,
  activeLinkColor     = "#708b8d",
  activeLinkOpacity   = 100,
  activeLinkTextColor = "#ffffff",
  linkTextColor       = "#000000",
  pillBgColor         = "#ffffff",
  pillBgOpacity       = 90,
  fixed               = false,
  className,
}: NavBarProps) {
  return (
    <nav
      className={cn(
        // Design: width 1216, height 65, padding [6,24], cornerRadius 8
        "w-full h-[65px] flex items-center justify-between",
        "px-6",              // horizontal padding: 24px
        "rounded-lg",        // cornerRadius: 8
        "border border-white/10",
        fixed && "fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-[1216px]",
        className
      )}
      style={{
        backgroundColor:     toRgba(bgColor, bgOpacity),
        backdropFilter:      blur ? "blur(3.5px)" : undefined,
        WebkitBackdropFilter:blur ? "blur(3.5px)" : undefined,
      }}
    >
      {/* Logo — left */}
      <div className="flex items-center flex-shrink-0">
        {logo}
      </div>

      {/* Nav pill — center
          Design measurement: NhGax height:36, width:452
          Pill height = auto (driven by active item's py-[6px] + text 16px*1.5 + py-[6px] = 36px)
          Inactive items: self-stretch to fill the 36px pill height
      */}
      <div
        className="flex items-center h-[36px] rounded-full border border-black/5"
        style={{ backgroundColor: toRgba(pillBgColor, pillBgOpacity) }}
      >
        {links.map((link) => {
          if (link.active) {
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current="page"
                className={cn(
                  "flex items-center self-stretch rounded-full",
                  "px-4",
                  "font-sans font-medium text-[12px] tracking-[0.1em] uppercase leading-[1.333]",
                  "whitespace-nowrap select-none"
                )}
                style={{
                  backgroundColor: toRgba(activeLinkColor, activeLinkOpacity),
                  color: activeLinkTextColor,
                }}
              >
                {link.label}
              </a>
            );
          }

          return (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                // Inactive: self-stretch fills the 36px pill height
                "flex items-center self-stretch",
                "px-4",
                "font-sans font-light text-[12px] tracking-[0.1em] uppercase leading-[1.333]",
                "whitespace-nowrap select-none",
                "hover:opacity-60 transition-opacity"
              )}
              style={{ color: linkTextColor }}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Action slot — right (design: width 76, height 37) */}
      <div className="flex items-center justify-end flex-shrink-0 w-[76px]">
        {action}
      </div>
    </nav>
  );
}
