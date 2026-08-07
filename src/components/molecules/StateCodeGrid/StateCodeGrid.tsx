"use client";

import { cn } from "@/lib/utils";
import { tier, TIER_LEGEND } from "@/lib/indicadores/tier";

/** Short abbreviations for each state, used inside the grid tiles (matches INEGI convention). */
const ABBR: Record<string, string> = {
  "Aguascalientes": "AGS",
  "Baja California": "BC",
  "Baja California Sur": "BCS",
  "Campeche": "CAMP",
  "Coahuila": "COAH",
  "Colima": "COL",
  "Chiapas": "CHIS",
  "Chihuahua": "CHIH",
  "Ciudad de México": "CDMX",
  "Durango": "DUR",
  "Guanajuato": "GTO",
  "Guerrero": "GRO",
  "Hidalgo": "HGO",
  "Jalisco": "JAL",
  "México": "MEX",
  "Michoacán": "MICH",
  "Morelos": "MOR",
  "Nayarit": "NAY",
  "Nuevo León": "NL",
  "Oaxaca": "OAX",
  "Puebla": "PUE",
  "Querétaro": "QRO",
  "Quintana Roo": "QROO",
  "San Luis Potosí": "SLP",
  "Sinaloa": "SIN",
  "Sonora": "SON",
  "Tabasco": "TAB",
  "Tamaulipas": "TAMS",
  "Tlaxcala": "TLAX",
  "Veracruz": "VER",
  "Yucatán": "YUC",
  "Zacatecas": "ZAC",
};

export interface StateCodeGridItem {
  state: string;
  code: string;
  value: number;
}

export interface StateCodeGridProps {
  items: StateCodeGridItem[];
  selectedState?: string;
  onSelect?: (state: string) => void;
  className?: string;
}

/**
 * 32-tile grid ordered by official INEGI entity code (01–32) — deliberately
 * not a geographic map, so every state gets equal visual weight regardless of
 * its territory size. Click a tile to change the selected state everywhere
 * else on the page.
 */
export function StateCodeGrid({ items, selectedState, onSelect, className }: StateCodeGridProps) {
  const sorted = [...items].sort((a, b) => a.code.localeCompare(b.code));

  return (
    <div className={className}>
      <div className="grid grid-cols-8 gap-2">
        {sorted.map((item) => {
          const t = tier(item.value);
          const selected = item.state === selectedState;
          return (
            <button
              key={item.state}
              type="button"
              onClick={() => onSelect?.(item.state)}
              title={`${item.code} ${item.state}: ${item.value}`}
              className={cn(
                "flex flex-col items-center justify-center rounded-[3px] border-2 py-2 transition-[filter]",
                "hover:brightness-110",
                selected ? "border-[#1a1c1c]" : "border-transparent"
              )}
              style={{ backgroundColor: t.color }}
            >
              <span className="font-sans text-white/80" style={{ fontSize: 8, lineHeight: 1.2 }}>
                {item.code}
              </span>
              <span className="font-sans font-bold text-white" style={{ fontSize: 9.5 }}>
                {ABBR[item.state] ?? item.state.slice(0, 4).toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3">
        {TIER_LEGEND.map((t) => (
          <span key={t.n} className="flex items-center gap-1.5 text-[11px] text-[#71717a] font-sans">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: t.color }} />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
