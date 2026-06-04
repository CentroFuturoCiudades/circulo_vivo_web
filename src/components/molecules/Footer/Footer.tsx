import { Globe, MessagesSquare, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/Logo";

export interface FooterColumnLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterColumnLink[];
}

export interface FooterProps {
  tagline?: string;
  columns?: FooterColumn[];
  copyright?: string;
  legalLinks?: FooterColumnLink[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  className?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    heading: "Plataforma",
    links: [
      { label: "Mapa Global",         href: "#" },
      { label: "Dashboard Regional",  href: "#" },
      { label: "Metodología",         href: "#" },
    ],
  },
  {
    heading: "Recursos",
    links: [
      { label: "Reportes PDF", href: "#" },
      { label: "API Pública",  href: "#" },
      { label: "Blog Cívico",  href: "#" },
    ],
  },
  {
    heading: "Contacto",
    links: [
      { label: "hola@circulovivo.org", href: "mailto:hola@circulovivo.org" },
      { label: "+52 (55) 1234 5678",   href: "tel:+5215512345678" },
      { label: "CDMX, México",         href: "#" },
    ],
  },
];

const defaultLegalLinks: FooterColumnLink[] = [
  { label: "Privacy",  href: "#" },
  { label: "Terms",    href: "#" },
  { label: "Security", href: "#" },
  { label: "Status",   href: "#" },
];

export function Footer({
  tagline = "Empoderando comunidades a través de tecnología transparente y datos accionables para un futuro más cívico.",
  columns = defaultColumns,
  copyright = "© 2024 CivicPulse. Empowering communities through transparent technology.",
  legalLinks = defaultLegalLinks,
  socialLinks = {},
  className,
}: FooterProps) {
  const iconCls = "text-[#a1a1aa] hover:text-[#52525b] transition-colors cursor-pointer";

  return (
    <footer className={cn("w-full bg-white", className)}>

      {/* ── Main row ── */}
      <div
        className="flex items-start justify-between px-8"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        {/* Left: logo + tagline + social icons */}
        <div className="flex flex-col items-start gap-4" style={{ maxWidth: 299 }}>
          <Logo className="h-[53px] w-auto self-start" />

          <p
            className="font-sans text-[12px] text-[#52525b] leading-[1.625]"
            style={{ width: 299 }}
          >
            {tagline}
          </p>

          {/* Social icons — gap 16, mt 8 */}
          <div className="flex items-center gap-4 mt-2">
            {socialLinks.twitter !== undefined ? (
              <a href={socialLinks.twitter} aria-label="Web" className={iconCls}><Globe size={18} /></a>
            ) : (
              <span className={iconCls}><Globe size={18} /></span>
            )}
            {socialLinks.linkedin !== undefined ? (
              <a href={socialLinks.linkedin} aria-label="Messages" className={iconCls}><MessagesSquare size={18} /></a>
            ) : (
              <span className={iconCls}><MessagesSquare size={18} /></span>
            )}
            {socialLinks.github !== undefined ? (
              <a href={socialLinks.github} aria-label="Share" className={iconCls}><Share2 size={18} /></a>
            ) : (
              <span className={iconCls}><Share2 size={18} /></span>
            )}
          </div>
        </div>

        {/* Right: link columns — gap 44 between columns */}
        <div className="flex gap-11">
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-sans font-normal text-[16px] text-[#18181b] leading-[1.5] uppercase">
                {col.heading}
              </span>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans font-normal text-[12px] text-[#71717a] hover:text-[#18181b] transition-colors leading-[1.333]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex items-center justify-between px-8 bg-white border-t border-[#e4e4e7]"
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <span className="font-sans font-normal text-[12px] text-[#52525b] leading-[1.333]">
          {copyright}
        </span>

        <nav className="flex items-center gap-6">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans font-normal text-[12px] text-[#71717a] hover:text-[#18181b] transition-colors leading-[1.333]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

    </footer>
  );
}
