"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CirculoVivoLogo } from "@/components/atoms/CirculoVivoLogo";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavBarProps {
  links: NavLink[];
  logo?: React.ReactNode;
  action?: React.ReactNode;

  bgColor?: string;
  bgOpacity?: number;
  blur?: boolean;
  activeLinkColor?: string;
  activeLinkOpacity?: number;
  activeLinkTextColor?: string;
  linkTextColor?: string;
  pillBgColor?: string;
  logoColor?: string;
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
  logoColor           = "#000000",
  fixed               = false,
  className,
}: NavBarProps) {
  const [open, setOpen] = useState(false);

  const bgStyle = {
    backgroundColor:      toRgba(bgColor, bgOpacity),
    backdropFilter:       blur ? "blur(3.5px)" : undefined,
    WebkitBackdropFilter: blur ? "blur(3.5px)" : undefined,
  };

  return (
    <div className="relative">
      {/* ── Bar ── */}
      <nav
        className={cn(
          "w-full h-[65px] flex items-center justify-between",
          "px-6",
          "rounded-lg",
          "border border-white/10",
          fixed && "fixed top-0 left-1/2 -translate-x-1/2 z-50 max-w-[1216px]",
          className
        )}
        style={bgStyle}
      >
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          {logo ?? <CirculoVivoLogo color={logoColor} />}
        </div>

        {/* Nav pill — desktop only */}
        <div
          className="hidden md:flex items-center h-[36px] rounded-full border border-black/5"
          style={{ backgroundColor: toRgba(pillBgColor, pillBgOpacity) }}
        >
          {links.map((link) =>
            link.active ? (
              <a
                key={link.href}
                href={link.href}
                aria-current="page"
                className="flex items-center self-stretch rounded-full px-4 font-sans font-medium text-[12px] tracking-[0.1em] uppercase leading-[1.333] whitespace-nowrap select-none"
                style={{
                  backgroundColor: toRgba(activeLinkColor, activeLinkOpacity),
                  color: activeLinkTextColor,
                }}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center self-stretch px-4 font-sans font-light text-[12px] tracking-[0.1em] uppercase leading-[1.333] whitespace-nowrap select-none hover:opacity-60 transition-opacity"
                style={{ color: linkTextColor }}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Right: action + hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0 md:w-[76px] justify-end">
          {action}
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md"
            style={{ color: logoColor }}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ── */}
      {open && (
        <div
          className="md:hidden absolute top-[69px] left-0 right-0 z-50 rounded-lg border border-white/10 overflow-hidden"
          style={bgStyle}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-6 py-4 font-sans font-medium text-[13px] tracking-[0.1em] uppercase border-b border-white/10 last:border-0 transition-opacity hover:opacity-70"
              style={{
                color: link.active ? activeLinkTextColor : linkTextColor,
                backgroundColor: link.active
                  ? toRgba(activeLinkColor, activeLinkOpacity)
                  : "transparent",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
