"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { cn } from "@/lib/utils";

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

export interface GananciaScatterChartProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  series2022?: ScatterPoint[];
  seriesProyeccion?: ScatterPoint[];
  analysisText?: string;
  className?: string;
}

const DEFAULT_SERIES_2022: ScatterPoint[] = [
  { x: 2, y: 0.44 }, { x: 9, y: 0.51 }, { x: 16, y: 0.48 }, { x: 22, y: 0.55 },
  { x: 29, y: 0.52 }, { x: 35, y: 0.60 }, { x: 42, y: 0.57 }, { x: 50, y: 0.63 },
  { x: 57, y: 0.59 }, { x: 65, y: 0.67 }, { x: 74, y: 0.72 }, { x: 83, y: 0.69 },
];

const DEFAULT_SERIES_PROYECCION: ScatterPoint[] = [
  { x: 5, y: 0.58 }, { x: 12, y: 0.65 }, { x: 19, y: 0.62 }, { x: 26, y: 0.70 },
  { x: 33, y: 0.67 }, { x: 40, y: 0.74 }, { x: 47, y: 0.71 }, { x: 54, y: 0.78 },
  { x: 61, y: 0.75 }, { x: 68, y: 0.73 }, { x: 77, y: 0.76 }, { x: 86, y: 0.80 },
];

const DEFAULT_ANALYSIS =
  "Análisis de Tendencia: El gráfico muestra el diferencial entre el IISE actual (azul marino) y el potencial tras intervenciones (ciruela). Chiapas y Guerrero muestran la mayor pendiente de crecimiento.";

export function GananciaScatterChart({
  title = "Ganancia IISE por Estado",
  subtitle = "Diferencial actual vs. Intervención proyectada",
  badge = "2022 vs Proyección",
  series2022 = DEFAULT_SERIES_2022,
  seriesProyeccion = DEFAULT_SERIES_PROYECCION,
  analysisText = DEFAULT_ANALYSIS,
  className,
}: GananciaScatterChartProps) {
  const chartData = [
    { id: "2022", data: series2022 },
    { id: "Proyección", data: seriesProyeccion },
  ];

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
            color: "#71717a",
            background: "#f4f4f5",
            borderRadius: 9999,
            padding: "2px 10px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#395284",
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
            2022
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#582a56",
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
            Proyección
          </span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 200 }}>
        <ResponsiveScatterPlot
          data={chartData}
          margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
          xScale={{ type: "linear", min: 0, max: 90 }}
          yScale={{ type: "linear", min: 0.2, max: 1 }}
          nodeSize={7}
          colors={["#395284", "#582a56"]}
          blendMode="normal"
          useMesh
          enableGridX
          enableGridY
          axisBottom={{
            tickValues: 5,
            format: (v) => String(v),
          }}
          axisLeft={{
            tickValues: 5,
            format: (v) => Number(v).toFixed(1),
          }}
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

      {/* Analysis box */}
      <div
        style={{
          background: "#eeeee2",
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#6b6b3a",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {analysisText}
        </p>
      </div>
    </div>
  );
}
