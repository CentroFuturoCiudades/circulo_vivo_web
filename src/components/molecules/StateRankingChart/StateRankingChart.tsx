"use client";

import { ResponsiveBar, type BarDatum, type BarCustomLayerProps } from "@nivo/bar";
import { cn } from "@/lib/utils";
import { tier } from "@/lib/indicadores/tier";

export interface StateRankingItem {
  state: string;
  value: number;
}

export interface StateRankingChartProps {
  items: StateRankingItem[];
  nationalAverage?: number;
  className?: string;
}

/** Custom nivo layer: dashed vertical line + label at the national-average x position. */
function AverageLine({ average, xScale, innerHeight }: { average?: number } & Partial<BarCustomLayerProps<BarDatum>>) {
  if (average == null || !xScale) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const x = (xScale as any)(average);
  if (typeof x !== "number") return null;
  return (
    <g>
      <line x1={x} x2={x} y1={0} y2={innerHeight} stroke="#212121" strokeWidth={2} strokeDasharray="5,4" />
      <text x={x} y={-8} textAnchor="middle" fontSize={11} fontWeight={700} fill="#212121" fontFamily="Poppins, sans-serif">
        Nacional ({average.toFixed(1)})
      </text>
    </g>
  );
}

/**
 * Horizontal bar ranking all 32 states on the currently selected domain (or
 * IGTA), colored by semáforo tier, with a dashed line marking the national
 * average. Tall by design — meant to show every state at once, not a
 * "top N" cutoff.
 */
export function StateRankingChart({ items, nationalAverage, className }: StateRankingChartProps) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const data: BarDatum[] = sorted.map((it) => ({ state: it.state, value: it.value }));

  return (
    <div className={cn("", className)} style={{ height: Math.max(560, sorted.length * 26) }}>
      <ResponsiveBar
        data={data}
        layout="horizontal"
        indexBy="state"
        keys={["value"]}
        colorBy="indexValue"
        colors={({ indexValue }) => tier(data.find((d) => d.state === indexValue)?.value as number ?? 0).color}
        margin={{ top: 24, right: 24, bottom: 20, left: 130 }}
        padding={0.3}
        valueScale={{ type: "linear", min: 0, max: 100 }}
        axisBottom={{ tickSize: 0, tickPadding: 6 }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        enableGridX
        enableGridY={false}
        enableLabel
        label={(d) => (d.value as number).toFixed(1)}
        labelPosition="end"
        labelOffset={8}
        labelTextColor="#1a1c1c"
        isInteractive
        animate={false}
        layers={["grid", "axes", "bars", (p) => <AverageLine {...p} average={nationalAverage} />, "markers", "legends"]}
        theme={{
          axis: { ticks: { text: { fontFamily: "Poppins, sans-serif", fontSize: 11, fill: "#71717a" } } },
          labels: { text: { fontFamily: "Poppins, sans-serif", fontSize: 10, fill: "#71717a" } },
          grid: { line: { stroke: "#f3f4f6", strokeWidth: 1 } },
        }}
        tooltip={({ indexValue, value }) => (
          <div className="bg-white rounded-md border border-[#e5e7eb] px-2.5 py-1.5 text-[12px] font-sans shadow-md">
            <b>{indexValue}</b>: {(value as number).toFixed(1)}
          </div>
        )}
      />
    </div>
  );
}
