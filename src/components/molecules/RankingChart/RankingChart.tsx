"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tab } from "@/components/atoms/Tab";
import { FilterPill } from "@/components/atoms/FilterPill";

export type ResilienceLevel = "Resiliente" | "Vulnerable" | "Crítico";

export interface RankingItem {
  state: string;
  value: number;
  level: ResilienceLevel;
}

export interface RankingTab { label: string; active?: boolean }
export interface RankingChip { label: string; active?: boolean }

export interface RankingChartProps {
  tabs?: RankingTab[];
  chips?: RankingChip[];
  title?: string;
  subtitle?: string;
  data?: RankingItem[];
  onTabChange?: (label: string) => void;
  onChipChange?: (label: string) => void;
  className?: string;
}

const LEVEL_COLOR: Record<ResilienceLevel, string> = {
  Resiliente: "#395284",
  Vulnerable:  "#bcb884",
  Crítico:     "#561427",
};

const DEFAULT_TABS: RankingTab[] = [
  { label: "SALUD", active: true },
  { label: "ACCESO FÍSICO" },
  { label: "ECONOMÍA" },
  { label: "AMBIENTE" },
  { label: "GOBERNANZA" },
];

const DEFAULT_CHIPS: RankingChip[] = [
  { label: "MORTALIDAD DIABETES", active: true },
  { label: "OBESIDAD" },
  { label: "ANEMIA" },
  { label: "DESNUTRICIÓN" },
];

const DEFAULT_DATA: RankingItem[] = [
  { state: "Querétaro",        value: 0.82, level: "Resiliente" },
  { state: "Nuevo León",       value: 0.78, level: "Resiliente" },
  { state: "Ciudad de México", value: 0.71, level: "Resiliente" },
  { state: "Jalisco",          value: 0.68, level: "Resiliente" },
  { state: "Sonora",           value: 0.64, level: "Resiliente" },
  { state: "Yucatán",          value: 0.62, level: "Vulnerable" },
  { state: "Hidalgo",          value: 0.59, level: "Vulnerable" },
  { state: "Sinaloa",          value: 0.55, level: "Vulnerable" },
  { state: "San Luis Potosí",  value: 0.51, level: "Vulnerable" },
  { state: "Puebla",           value: 0.48, level: "Vulnerable" },
  { state: "Oaxaca",           value: 0.45, level: "Vulnerable" },
  { state: "Chihuahua",        value: 0.45, level: "Vulnerable" },
  { state: "Durango",          value: 0.45, level: "Vulnerable" },
  { state: "Veracruz",         value: 0.41, level: "Crítico" },
  { state: "Zacatecas",        value: 0.39, level: "Crítico" },
  { state: "Chiapas",          value: 0.38, level: "Crítico" },
  { state: "Tabasco",          value: 0.35, level: "Crítico" },
  { state: "Guerrero",         value: 0.32, level: "Crítico" },
];

export function RankingChart({
  tabs    = DEFAULT_TABS,
  chips   = DEFAULT_CHIPS,
  title   = "Ranking de Ganancia IISE por Estado",
  subtitle = "Comparativa regional basada en resiliencia de salud.",
  data    = DEFAULT_DATA,
  onTabChange,
  onChipChange,
  className,
}: RankingChartProps) {
  const [activeTab,  setActiveTab]  = useState(() => tabs.find(t => t.active)?.label  ?? tabs[0]?.label  ?? "");
  const [activeChip, setActiveChip] = useState(() => chips.find(c => c.active)?.label ?? chips[0]?.label ?? "");

  function handleTab(label: string)  { setActiveTab(label);  onTabChange?.(label); }
  function handleChip(label: string) { setActiveChip(label); onChipChange?.(label); }

  return (
    <div
      className={cn("bg-white rounded-2xl border border-[#d1c6cf] overflow-hidden", className)}
      style={{ boxShadow: "0 1px 2.625px rgba(0,0,0,0.04), 0 2px 10.5px rgba(57,82,132,0.07)" }}
    >
      {/* Thematic tabs — Tab atom */}
      <div className="flex items-stretch overflow-x-auto" style={{ borderBottom: "1px solid #f3f4f6" }}>
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            active={tab.label === activeTab}
            onClick={() => handleTab(tab.label)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>

      {/* Sub-indicator chips — FilterPill atom */}
      <div className="flex items-center gap-2 flex-wrap" style={{ padding: "25px 24px 24px" }}>
        {chips.map(chip => (
          <FilterPill
            key={chip.label}
            variant={chip.label === activeChip ? "active" : "default"}
            onClick={() => handleChip(chip.label)}
          >
            {chip.label}
          </FilterPill>
        ))}
      </div>

      {/* Header */}
      <div style={{ padding: "0 24px 16px" }}>
        <h3
          className="font-serif font-bold"
          style={{ fontSize: 24, lineHeight: 1.4, color: "#1c1c18", margin: 0 }}
        >
          {title}
        </h3>
        <p
          className="font-sans font-normal"
          style={{ fontSize: 14, lineHeight: 1.43, color: "#6b7280", marginTop: 2 }}
        >
          {subtitle}
        </p>
      </div>

      {/* Ranking list */}
      <div style={{ padding: "1px 24px 24px" }}>
        <div className="flex flex-col" style={{ gap: 16 }}>
          {data.map(item => {
            const color = LEVEL_COLOR[item.level];
            return (
              <div key={item.state} className="flex flex-col" style={{ gap: 4 }}>
                {/* State name + value row */}
                <div className="flex items-center justify-between">
                  <span className="font-sans font-normal" style={{ fontSize: 12, color: "#1c1c18" }}>
                    {item.state}
                  </span>
                  <span className="font-sans font-bold" style={{ fontSize: 12, color: "#708b8d" }}>
                    {item.value.toFixed(2)} ({item.level})
                  </span>
                </div>
                {/* Progress bar track + fill */}
                <div
                  className="w-full overflow-hidden"
                  style={{ height: 16, borderRadius: 9999, background: "#f3f4f6" }}
                >
                  <div
                    style={{
                      width: `${item.value * 100}%`,
                      height: 16,
                      borderRadius: 9999,
                      background: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
