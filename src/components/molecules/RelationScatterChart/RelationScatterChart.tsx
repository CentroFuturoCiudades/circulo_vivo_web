"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { cn } from "@/lib/utils";

export interface RelationScatterPoint {
  x: number;
  y: number;
  label: string;
}

export interface RelationScatterChartProps {
  points: RelationScatterPoint[];
  highlightLabel?: string;
  xLabel: string;
  yLabel: string;
  xMin?: number | null;
  xMax?: number | null;
  yMin?: number | null;
  yMax?: number | null;
  tooltip?: (label: string) => string;
  className?: string;
}

/**
 * Scatter of all 32 states for a chosen pair of indicators (the "¿Cómo se
 * conectan las piezas del sistema alimentario?" relation explorer). The
 * selected state's point is enlarged and recolored to stand out.
 */
export function RelationScatterChart({
  points, highlightLabel, xLabel, yLabel, xMin, xMax, yMin, yMax, tooltip, className,
}: RelationScatterChartProps) {
  // nivo's `colors` prop only sees the series id, not per-point data — so the
  // highlighted state gets its own single-point series instead of a per-point color function.
  const rest = points.filter((p) => p.label !== highlightLabel);
  const highlighted = points.filter((p) => p.label === highlightLabel);
  const data = [
    { id: "otros", data: rest },
    { id: "resaltado", data: highlighted },
  ];

  return (
    <div className={cn("", className)} style={{ height: 280 }}>
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 10, right: 24, bottom: 50, left: 55 }}
        xScale={{ type: "linear", min: xMin ?? "auto", max: xMax ?? "auto" }}
        yScale={{ type: "linear", min: yMin ?? "auto", max: yMax ?? "auto" }}
        nodeSize={(d) => (d.serieId === "resaltado" ? 12 : 6)}
        colors={(d) => (d.serieId === "resaltado" ? "#395284" : "rgba(88,42,86,0.55)")}
        blendMode="normal"
        useMesh
        enableGridX
        enableGridY
        axisBottom={{ legend: xLabel, legendPosition: "middle", legendOffset: 38, tickValues: 5 }}
        axisLeft={{ legend: yLabel, legendPosition: "middle", legendOffset: -44, tickValues: 5 }}
        legends={[]}
        theme={{
          axis: {
            ticks: { text: { fontFamily: "Poppins, sans-serif", fontSize: 10, fill: "#71717a" } },
            legend: { text: { fontFamily: "Poppins, sans-serif", fontSize: 11, fill: "#1a1c1c" } },
          },
          grid: { line: { stroke: "#e5e7eb", strokeWidth: 1 } },
        }}
        tooltip={({ node }) => (
          <div className="bg-white rounded-md border border-[#e5e7eb] px-2.5 py-1.5 text-[12px] font-sans shadow-md">
            {tooltip ? tooltip(node.data.label) : node.data.label}
          </div>
        )}
      />
    </div>
  );
}
