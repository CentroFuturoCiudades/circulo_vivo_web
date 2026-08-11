"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { cn } from "@/lib/utils";

export interface DispersionPoint {
  x: number;
  y: number;
}

export interface StatBox {
  label: string;
  value: string;
  bg: string;
  labelColor: string;
  valueColor: string;
}

export interface DispersionChartProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  points?: DispersionPoint[];
  stats?: StatBox[];
  className?: string;
}

const DEFAULT_POINTS: DispersionPoint[] = [
  { x: 15, y: 0.35 }, { x: 20, y: 0.42 }, { x: 26, y: 0.47 }, { x: 31, y: 0.51 },
  { x: 37, y: 0.54 }, { x: 43, y: 0.57 }, { x: 49, y: 0.59 }, { x: 55, y: 0.61 },
  { x: 61, y: 0.63 }, { x: 67, y: 0.65 }, { x: 73, y: 0.67 }, { x: 78, y: 0.69 },
  { x: 83, y: 0.70 }, { x: 87, y: 0.71 }, { x: 90, y: 0.72 },
];

const DEFAULT_STATS: StatBox[] = [
  { label: "CORRELACIÓN", value: "0.84", bg: "#eeeee2", labelColor: "#a09860", valueColor: "#bcb884" },
  { label: "DESV. EST.", value: "14.8", bg: "#e8eeef", labelColor: "#8aabae", valueColor: "#708b8d" },
  { label: "MÍNIMO", value: "15.1", bg: "#f5e8ea", labelColor: "#b87a80", valueColor: "#561427" },
  { label: "MÁXIMO", value: "95.2", bg: "#e8f0ee", labelColor: "#8aabae", valueColor: "#708b8d" },
];

export function DispersionChart({
  title = "Dispersión: Indicador × IISE",
  subtitle = "Correlación por variable de indicador",
  badge = "Mortalidad Diabetes",
  badgeBg = "#f0e8f0",
  badgeColor = "#582a56",
  points = DEFAULT_POINTS,
  stats = DEFAULT_STATS,
  className,
}: DispersionChartProps) {
  const chartData = [{ id: "dispersión", data: points }];

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
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex flex-col gap-0.5">
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#1a1c1c",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              fontWeight: 400,
              color: "#71717a",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: badgeColor,
            background: badgeBg,
            borderRadius: 9999,
            padding: "2px 10px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: 200 }}>
        <ResponsiveScatterPlot
          data={chartData}
          margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
          xScale={{ type: "linear", min: 15, max: 90 }}
          yScale={{ type: "linear", min: 0.3, max: 1 }}
          nodeSize={7}
          colors={["#582a56"]}
          blendMode="normal"
          useMesh
          enableGridX
          enableGridY
          axisBottom={{ tickValues: 4 }}
          axisLeft={{ tickValues: 4 }}
          legends={[]}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 10,
                  fill: "#71717a",
                },
              },
            },
            grid: {
              line: { stroke: "#e5e7eb", strokeWidth: 1 },
            },
          }}
        />
      </div>

      {/* Stat boxes */}
      <div className="flex gap-2 flex-wrap mb-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: "1 1 0",
              minWidth: 60,
              background: stat.bg,
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 9,
                fontWeight: 600,
                color: stat.labelColor,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                margin: "0 0 2px 0",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 22,
                fontWeight: 600,
                color: stat.valueColor,
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
