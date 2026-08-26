import type { DomainKey, IndicadoresDataset } from "@/lib/azure/indicadores";

export type DomainOrIgta = DomainKey | "igta";

export function domainValue(dataset: IndicadoresDataset, state: string, key: DomainOrIgta): number {
  return dataset.domainScores[state]?.[key] ?? 0;
}

export function nationalDomainValue(dataset: IndicadoresDataset, key: DomainOrIgta): number {
  return dataset.nationalScores[key] ?? 0;
}

/**
 * Min/max of a single indicator's value across all 32 states — used to place
 * the state/national dots along the 0–100 comparison track. Returns null when
 * there isn't enough spread to normalize (e.g. all states tied, or fewer
 * than 2 numeric values).
 */
export function indicatorMinMax(
  dataset: IndicadoresDataset,
  domain: DomainKey,
  indicatorName: string
): { min: number; max: number } | null {
  let min = Infinity;
  let max = -Infinity;
  for (const state of dataset.states) {
    const items = dataset.indicatorsByState[state]?.[domain] ?? [];
    const item = items.find((i) => i.name === indicatorName);
    if (item?.value != null) {
      if (item.value < min) min = item.value;
      if (item.value > max) max = item.value;
    }
  }
  if (!Number.isFinite(min) || !Number.isFinite(max) || max === min) return null;
  return { min, max };
}

/** Maps a raw value to a 0–100 track position, inverted when lower-is-better, clamped to keep dots visible near the edges. */
export function toTrackPercent(value: number, min: number, max: number, direction: "up" | "down" | "neutral"): number {
  let pct = ((value - min) / (max - min)) * 100;
  if (direction === "down") pct = 100 - pct;
  return Math.max(2, Math.min(98, pct));
}

export function pctChange(oldValue: number | null, newValue: number | null): number | null {
  if (oldValue === null || newValue === null || oldValue === 0) return null;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

export function changeDirectionWord(pct: number): string {
  if (Math.abs(pct) < 0.05) return "se mantuvo prácticamente sin cambio";
  return pct >= 0 ? `aumentó ${Math.abs(pct).toFixed(1)}%` : `disminuyó ${Math.abs(pct).toFixed(1)}%`;
}
