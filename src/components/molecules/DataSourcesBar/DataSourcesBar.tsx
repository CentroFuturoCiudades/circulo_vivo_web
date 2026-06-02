"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataSourcesLink {
  label: string;
  href: string;
}

export interface DataSourcesBarProps {
  sources?: string;
  links?: DataSourcesLink[];
  className?: string;
}

const defaultLinks: DataSourcesLink[] = [
  { label: "Metodología",   href: "#" },
  { label: "Glosario",      href: "#" },
  { label: "Descargar CSV", href: "#" },
];

export function DataSourcesBar({
  sources = "Fuentes: ENSANUT 2022, CONEVAL 2023, INEGI Censo de Población 2020, SSA Registros de Mortalidad 2022, FAO FAOSTAT 2023, SIAP-SADER 2022. Los índices IISE fueron calculados por el equipo de Círculo Vivo con metodología propia.",
  links = defaultLinks,
  className,
}: DataSourcesBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn("w-full border-t border-[#e5e7eb]", className)}
      style={{ backgroundColor: "#f0f2f5" }}
    >
      {/* ── Main row — animated collapse ── */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span
                  className="font-sans font-normal text-secondary leading-[1.5]"
                  style={{ fontSize: "10px" }}
                >
                  FUENTES DE INFORMACIÓN
                </span>
                <p
                  className="font-sans font-normal text-[#6b7280] leading-[1.625]"
                  style={{ fontSize: "12px" }}
                >
                  {sources}
                </p>
              </div>
              <nav className="flex items-center gap-6 flex-shrink-0 ml-6">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-sans font-normal text-[#6b7280] hover:text-[#374151] transition-colors leading-[1.5]"
                    style={{ fontSize: "10px" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Collapse toggle ── */}
      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expandir fuentes" : "Colapsar fuentes"}
        className="flex items-center justify-center w-full py-1 hover:bg-[#e5e7eb] transition-colors"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown size={7} className="text-[#9ca3af]" />
        </motion.div>
      </button>
    </div>
  );
}
