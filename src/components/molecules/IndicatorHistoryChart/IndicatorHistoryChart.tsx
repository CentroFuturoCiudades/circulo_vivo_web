"use client";

import { ResponsiveLine } from "@nivo/line";
import { cn } from "@/lib/utils";
import { fmtNum } from "@/lib/indicadores/tier";

export interface IndicatorHistoryChartProps {
  /** Set to undefined/null when this indicator has no earlier round to compare against. */
  oldYear?: number | null;
  oldValue?: number | null;
  year?: number | null;
  value?: number | null;
  unavailableNote?: string;
  sourceLine?: string;
  className?: string;
}

/**
 * Two-point line showing how a single indicator changed between its earliest
 * and most recent available round for the selected state. Falls back to an
 * explanatory note when the source matrix only has one round for it.
 */
export function IndicatorHistoryChart({
  oldYear, oldValue, year, value, unavailableNote, sourceLine, className,
}: IndicatorHistoryChartProps) {
  const available = oldYear != null && oldValue != null && year != null && value != null;

  if (!available) {
    return (
      <div className={cn("flex items-center justify-center text-center", className)} style={{ height: 260 }}>
        <p className="font-sans text-[12.5px] text-[#71717a] max-w-xs">
          {unavailableNote ??
            "Este indicador no cuenta con una ronda anterior en la matriz de datos, por lo que no es posible compararlo en el tiempo por ahora."}
        </p>
      </div>
    );
  }

  const data = [
    {
      id: "valor",
      data: [
        { x: String(oldYear), y: oldValue },
        { x: String(year), y: value },
      ],
    },
  ];

  return (
    <div className={className}>
      <div style={{ height: 260 }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 16, right: 24, bottom: 30, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", nice: true }}
          colors={["#395284"]}
          lineWidth={2.5}
          pointSize={9}
          pointColor="#395284"
          pointBorderWidth={2}
          pointBorderColor="#fff"
          enableGridX={false}
          axisBottom={{ tickSize: 0, tickPadding: 8 }}
          axisLeft={{ tickSize: 0, tickPadding: 6, format: (v) => fmtNum(v as number) }}
          useMesh
          theme={{
            axis: { ticks: { text: { fontFamily: "Poppins, sans-serif", fontSize: 11, fill: "#71717a" } } },
            grid: { line: { stroke: "#f3f4f6", strokeWidth: 1 } },
          }}
          tooltip={({ point }) => (
            <div className="bg-white rounded-md border border-[#e5e7eb] px-2.5 py-1.5 text-[12px] font-sans shadow-md">
              {fmtNum(point.data.y as number)}
            </div>
          )}
        />
      </div>
      {sourceLine && <p className="font-sans text-[12px] text-[#71717a] mt-2">{sourceLine}</p>}
    </div>
  );
}
