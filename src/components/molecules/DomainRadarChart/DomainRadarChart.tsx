"use client";

import { ResponsiveRadar } from "@nivo/radar";
import { cn } from "@/lib/utils";

export interface DomainRadarPoint {
  domain: string;
  stateValue: number;
  nationalValue: number;
}

export interface DomainRadarChartProps {
  stateName: string;
  points: DomainRadarPoint[];
  className?: string;
}

/**
 * Radar comparing the selected state against the national reference across
 * domains. Impulsores is deliberately excluded upstream — it has no
 * normative "better/worse" direction, so it doesn't belong on a "how well is
 * this state doing" chart.
 */
export function DomainRadarChart({ stateName, points, className }: DomainRadarChartProps) {
  const data = points.map((p) => ({
    domain: p.domain,
    [stateName]: p.stateValue,
    "Nacional": p.nationalValue,
  }));

  return (
    <div className={cn("", className)} style={{ height: 260 }}>
      <ResponsiveRadar
        data={data}
        keys={[stateName, "Nacional"]}
        indexBy="domain"
        maxValue={100}
        margin={{ top: 30, right: 60, bottom: 30, left: 60 }}
        gridLevels={4}
        gridShape="circular"
        colors={["#395284", "#708b8d"]}
        fillOpacity={0.22}
        borderWidth={2}
        dotSize={6}
        dotBorderWidth={2}
        dotBorderColor={{ from: "color" }}
        enableDotLabel={false}
        gridLabelOffset={16}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 24,
            itemWidth: 90,
            itemHeight: 16,
            symbolSize: 10,
            symbolShape: "circle",
          },
        ]}
        theme={{
          text: { fontFamily: "Poppins, sans-serif", fontSize: 10, fill: "#71717a" },
          grid: { line: { stroke: "#e5e7eb" } },
          legends: { text: { fontFamily: "Poppins, sans-serif", fontSize: 11, fill: "#71717a" } },
        }}
      />
    </div>
  );
}
