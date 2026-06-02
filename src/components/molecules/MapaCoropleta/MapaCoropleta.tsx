"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FilterPill } from "@/components/atoms/FilterPill";

export type ResilienceLevel = "Crítico" | "Vulnerable" | "Transición" | "Resiliente";

export interface StateData {
  id: string;
  level: ResilienceLevel;
  value?: number;
}

export interface MapaCoropletaProps {
  title?: string;
  subtitle?: string;
  states?: StateData[];
  activeTab?: string;
  tabs?: string[];
  onTabChange?: (tab: string) => void;
  stats?: { label: string; count: number; level: ResilienceLevel }[];
  className?: string;
}

const LEVEL_COLORS: Record<
  ResilienceLevel,
  { light: string; dark: string; border: string; dot: string; bg: string }
> = {
  Crítico: {
    light: "#f5e8ea",
    dark: "rgba(86,20,39,0.16)",
    border: "rgba(86,20,39,0.14)",
    dot: "#561427",
    bg: "#f5e8ea",
  },
  Vulnerable: {
    light: "#f0e8f0",
    dark: "rgba(88,42,86,0.16)",
    border: "rgba(88,42,86,0.14)",
    dot: "#582a56",
    bg: "#f0e8f0",
  },
  Transición: {
    light: "#e8eeef",
    dark: "rgba(112,139,141,0.16)",
    border: "rgba(112,139,141,0.14)",
    dot: "#708b8d",
    bg: "#e8eeef",
  },
  Resiliente: {
    light: "#eeeee2",
    dark: "rgba(188,184,132,0.16)",
    border: "rgba(188,184,132,0.14)",
    dot: "#bcb884",
    bg: "#eeeee2",
  },
};

const DEFAULT_STATES: StateData[] = [
  { id: "BC", level: "Vulnerable" },
  { id: "SO", level: "Transición" },
  { id: "CH", level: "Crítico" },
  { id: "CO", level: "Transición" },
  { id: "NL", level: "Resiliente" },
  { id: "TA", level: "Crítico" },
  { id: "BCS", level: "Resiliente" },
  { id: "SI", level: "Vulnerable" },
  { id: "DU", level: "Vulnerable" },
  { id: "ZA", level: "Crítico" },
  { id: "SLP", level: "Transición" },
  { id: "VE", level: "Crítico" },
  { id: "YU", level: "Resiliente" },
  { id: "NA", level: "Crítico" },
  { id: "AG", level: "Transición" },
  { id: "JA", level: "Resiliente" },
  { id: "GU", level: "Transición" },
  { id: "QE", level: "Resiliente" },
  { id: "HI", level: "Vulnerable" },
  { id: "QR", level: "Vulnerable" },
  { id: "CA", level: "Transición" },
  { id: "CL", level: "Vulnerable" },
  { id: "MI", level: "Crítico" },
  { id: "MO", level: "Crítico" },
  { id: "PU", level: "Vulnerable" },
  { id: "TL", level: "Transición" },
  { id: "TB", level: "Crítico" },
  { id: "GR", level: "Crítico" },
  { id: "OA", level: "Crítico" },
  { id: "CS", level: "Crítico" },
  { id: "EM", level: "Vulnerable" },
  { id: "CD", level: "Resiliente" },
];

const DEFAULT_TABS = ["IISE ACTUAL", "ACCESO FÍSICO", "SALUD"];

const GRID_ROWS = [
  ["BC", "SO", "CH", "CO", "NL", "TA"],
  ["BCS", "SI", "DU", "ZA", "SLP", "VE", "YU"],
  ["NA", "AG", "JA", "GU", "QE", "HI", "QR"],
  ["CA", "CL", "MI", "MO", "PU", "TL", "TB"],
  ["GR", "OA", "CS", "EM", "CD"],
];

const TILE_W = 46;
const TILE_H = 53;
const TILE_GAP = 4;
const TILE_STEP_X = TILE_W + TILE_GAP;
const TILE_STEP_Y = TILE_H + TILE_GAP;
const ODD_OFFSET = TILE_STEP_X / 2;

const CONTAINER_H = 5 * TILE_STEP_Y - TILE_GAP;
const CONTAINER_W = 7 * TILE_STEP_X + ODD_OFFSET;

const DEFAULT_STATS = [
  { label: "Críticos", count: 12, level: "Crítico" as ResilienceLevel },
  { label: "Vulnerables", count: 8, level: "Vulnerable" as ResilienceLevel },
  { label: "Transición", count: 7, level: "Transición" as ResilienceLevel },
  { label: "Resilientes", count: 5, level: "Resiliente" as ResilienceLevel },
];

function StateTile({ id, level }: { id: string; level: ResilienceLevel }) {
  const c = LEVEL_COLORS[level];
  return (
    <div
      style={{
        width: TILE_W,
        height: TILE_H,
        background: `linear-gradient(150deg, ${c.light} 0%, ${c.dark} 100%)`,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
      }}
    >
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: "#414848",
          letterSpacing: 0.2,
        }}
      >
        {id}
      </span>
    </div>
  );
}

export function MapaCoropleta({
  title = "Mapa Coropleta de Índices",
  subtitle = "Análisis territorial por categoría de resiliencia alimentaria.",
  states = DEFAULT_STATES,
  activeTab: _activeTab,
  tabs = DEFAULT_TABS,
  onTabChange,
  stats = DEFAULT_STATS,
  className,
}: MapaCoropletaProps) {
  const [activeTab, setActiveTab] = useState(_activeTab ?? tabs[0]);

  const stateMap = new Map<string, ResilienceLevel>(
    states.map((s) => [s.id, s.level])
  );

  function handleTab(tab: string) {
    setActiveTab(tab);
    onTabChange?.(tab);
  }

  return (
    <div
      className={cn("bg-white", className)}
      style={{
        borderRadius: 16,
        border: "1px solid #d1c6cf",
        boxShadow:
          "0 1px 2.625px rgba(0,0,0,0.04), 0 2px 10.5px rgba(57,82,132,0.07)",
        padding: "25px 25px 1px 25px",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3
            className="font-serif font-bold"
            style={{ fontSize: 18, lineHeight: 1.25, color: "#1c1018", margin: 0 }}
          >
            {title}
          </h3>
          <p
            className="font-sans font-normal"
            style={{ fontSize: 12, color: "#8a7888", lineHeight: 1.33, marginTop: 2 }}
          >
            {subtitle}
          </p>
        </div>

        {/* Tabs — FilterPill navy for active, tealLight for inactive */}
        <div className="flex items-center gap-1.5 shrink-0">
          {tabs.map((tab) => (
            <FilterPill
              key={tab}
              variant={tab === activeTab ? "navy" : "default"}
              className={cn(
                "h-[42px] text-[10px] font-semibold tracking-[0.025em]",
                tab !== activeTab && "bg-[#c3d2d9]/30 border-transparent text-primary"
              )}
              onClick={() => handleTab(tab)}
            >
              {tab}
            </FilterPill>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          width: CONTAINER_W,
          height: CONTAINER_H,
          margin: "0 auto",
        }}
      >
        {GRID_ROWS.map((row, rowIndex) => {
          const isOdd = rowIndex % 2 === 1;
          const offsetX = isOdd ? ODD_OFFSET : 0;
          const y = rowIndex * TILE_STEP_Y;
          return row.map((stateId, colIndex) => {
            const level = stateMap.get(stateId) ?? "Crítico";
            const x = offsetX + colIndex * TILE_STEP_X;
            return (
              <div
                key={stateId}
                style={{ position: "absolute", left: x, top: y }}
              >
                <StateTile id={stateId} level={level} />
              </div>
            );
          });
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 10,
              color: "#71717a",
            }}
          >
            ESCALA DE VALOR IISE
          </span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 10,
              color: "#71717a",
            }}
          >
            ÓPTIMO (1.0)
          </span>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(to right, #f5e8ea, #e8eeef, #eeeee2)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          {[
            "0.0–0.35 Crítico",
            "0.35–0.55 Vulnerable",
            "0.55–0.70 Transición",
            "0.75–1.0 Resiliente",
          ].map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 9,
                color: "#a1a1aa",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 16,
          paddingBottom: 20,
        }}
      >
        {stats.map((stat) => {
          const c = LEVEL_COLORS[stat.level];
          return (
            <div
              key={stat.level}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderRadius: 8,
                border: `1px solid ${c.border}`,
                background: c.bg,
                padding: "8px 12px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c.dot,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1c1018",
                  lineHeight: 1,
                }}
              >
                {String(stat.count).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 11,
                  fontWeight: 400,
                  color: "#71717a",
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
