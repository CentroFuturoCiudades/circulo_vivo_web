"use client";

import { Bar, type BarDatum } from "@nivo/bar";
import { cn } from "@/lib/utils";

export interface GanadorItem {
  state: string;
  value: number;
  color?: string;
}

export interface TopGanadoresChartProps {
  title?: string;
  subtitle?: string;
  data?: GanadorItem[];
  legendLabel?: string;
  className?: string;
}

const DEFAULT_COLORS: Record<string, string> = {
  Chiapas: "#bcb884",
  Hidalgo: "#395284",
  Veracruz: "#708b8d",
  Puebla: "#708b8d",
  "San Luis Potosí": "#708b8d",
  Oaxaca: "#708b8d",
  Tabasco: "#582a56",
  Guerrero: "#582a56",
};

const DEFAULT_DATA: GanadorItem[] = [
  { state: "Chiapas", value: 0.09 },
  { state: "Hidalgo", value: 0.081 },
  { state: "Veracruz", value: 0.062 },
  { state: "Puebla", value: 0.061 },
  { state: "San Luis Potosí", value: 0.06 },
  { state: "Oaxaca", value: 0.06 },
  { state: "Tabasco", value: 0.048 },
  { state: "Guerrero", value: 0.035 },
];

export function TopGanadoresChart({
  title = "Top 8 Ganadores de Impacto",
  subtitle = "Estados con mayor ganancia en índice IISE",
  data = DEFAULT_DATA,
  legendLabel = "Delta IISE",
  className,
}: TopGanadoresChartProps) {
  const colorMap: Record<string, string> = {};
  for (const item of data) {
    colorMap[item.state] = item.color ?? DEFAULT_COLORS[item.state] ?? "#708b8d";
  }

  return (
    <div
      className={cn("bg-white rounded-2xl border border-[#d1c6cf]", className)}
      style={{
        boxShadow:
          "0 1px 2.625px rgba(0,0,0,0.04), 0 2px 10.5px rgba(57,82,132,0.07)",
        padding: "25px 25px 1px 25px",
      }}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex flex-col gap-0.5">
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#1a1c1c",
              lineHeight: 1.3,
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
            }}
          >
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#bcb884",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              color: "#71717a",
            }}
          >
            {legendLabel}
          </span>
        </div>
      </div>

      <Bar
        width={461}
        height={232}
        data={data.map(({ state, value }): BarDatum => ({ state, value }))}

        layout="horizontal"
        indexBy="state"
        keys={["value"]}
        colorBy="indexValue"
        colors={({ indexValue }) =>
          colorMap[indexValue as string] ?? "#708b8d"
        }
        margin={{ top: 0, right: 70, bottom: 20, left: 90 }}
        padding={0.35}
        axisBottom={{
          tickSize: 0,
          tickPadding: 4,
          format: (v) => (v as number).toFixed(3),
        }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        label={(d) => `+${(d.value as number).toFixed(3)}`}
        labelPosition="end"
        labelOffset={6}
        isInteractive={false}
        animate={false}
        theme={{
          axis: {
            ticks: {
              text: {
                fontFamily: "Poppins, sans-serif",
                fontSize: 11,
                fill: "#71717a",
              },
            },
          },
          labels: {
            text: {
              fontFamily: "Poppins, sans-serif",
              fontSize: 11,
              fill: "#71717a",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
              strokeWidth: 1,
            },
          },
        }}
      />
    </div>
  );
}
