/**
 * Shared semáforo (5-tier stoplight) helpers for the /indicadores dashboard.
 * Colors are drawn from the project's existing design tokens (crimson/purple/
 * gold/primary/secondary) rather than one-off hex values, so the dashboard
 * stays visually consistent with the rest of the site.
 */

export interface Tier {
  n: 1 | 2 | 3 | 4 | 5;
  label: string;
  color: string;
}

const TIERS: Tier[] = [
  { n: 1, label: "Muy preocupante", color: "#561427" }, // crimson-500
  { n: 2, label: "Preocupante",     color: "#7F4D7B" }, // purple
  { n: 3, label: "Aceptable",       color: "#BCB884" }, // gold
  { n: 4, label: "Bueno",           color: "#708B8D" }, // primary (teal)
  { n: 5, label: "Excelente",       color: "#395284" }, // secondary (navy)
];

export function tier(value: number): Tier {
  if (value < 35) return TIERS[0];
  if (value < 50) return TIERS[1];
  if (value < 65) return TIERS[2];
  if (value < 80) return TIERS[3];
  return TIERS[4];
}

export const TIER_LEGEND = TIERS;

/** Formats a number the way the source dashboard does: es-MX, thousands grouped, 0–2 decimals. */
export function fmtNum(v: number | null | undefined): string {
  if (v === null || v === undefined || Number.isNaN(v)) return "s/d";
  return v >= 1000
    ? v.toLocaleString("es-MX", { maximumFractionDigits: 0 })
    : v.toLocaleString("es-MX", { maximumFractionDigits: 2 });
}

export function corrLabel(rho: number): string {
  const a = Math.abs(rho);
  const strength =
    a < 0.2 ? "muy débil" : a < 0.4 ? "débil" : a < 0.6 ? "moderada" : a < 0.8 ? "fuerte" : "muy fuerte";
  const dir = rho >= 0 ? "positiva" : "negativa";
  return `${strength} y ${dir}`;
}
