export interface Indicator {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  category: IndicatorCategory;
  trend: "up" | "down" | "stable";
  changePercent: number;
  year: number;
  region?: string;
  historicalData: { year: number; value: number }[];
}

export type IndicatorCategory =
  | "seguridad_alimentaria"
  | "sostenibilidad"
  | "economia"
  | "salud"
  | "medio_ambiente";
