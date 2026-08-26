import { BLOB_PATHS, resolveDataBlobUrl } from "./paths";
import { fetchCsvRows } from "./csv";

/**
 * Data layer for the /indicadores page — the "Semáforo estatal de
 * transformación alimentaria" dashboard. Source: 5 CSVs derived from the
 * "plantilla_datos_propuesta1_v12.xlsx" workbook, uploaded as-is to
 * `datos/indicadores/csv/` (see BLOB_PATHS). Domain keys are normalized to
 * English internally; all display strings stay in Spanish.
 */

export const DOMAIN_KEYS = ["impulsores", "cadena", "entorno", "consumidor", "resultados"] as const;
export type DomainKey = (typeof DOMAIN_KEYS)[number];

export const DOMAIN_LABELS: Record<DomainKey, string> = {
  impulsores: "Impulsores",
  cadena: "Cadena de suministro",
  entorno: "Entorno alimentario",
  consumidor: "Comportamiento del consumidor",
  resultados: "Resultados",
};

const DOMAIN_LABEL_TO_KEY: Record<string, DomainKey> = {
  "Impulsores": "impulsores",
  "Cadena de suministro": "cadena",
  "Entorno alimentario": "entorno",
  "Comportamiento del consumidor": "consumidor",
  "Resultados": "resultados",
};

export type Trend = "up" | "down" | "flat" | "na";
export type Direction = "up" | "down" | "neutral";

function toTrend(raw: string): Trend {
  const v = raw.trim().toLowerCase();
  if (v === "mejora") return "up";
  if (v === "deterioro") return "down";
  if (v === "sin cambio") return "flat";
  return "na";
}

function toDirection(raw: string): Direction {
  const v = raw.trim().toLowerCase();
  if (v === "mayor es mejor") return "up";
  if (v === "menor es mejor") return "down";
  return "neutral";
}

function toNum(raw: string | undefined): number | null {
  if (raw === undefined || raw === null || raw.trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

// ── Row shapes (all CSV cells arrive as strings) ────────────────────────────

interface IndicadorCsvRow {
  code: string;
  state: string;
  domain: string;
  subtopic?: string;
  indicator: string;
  year: string;
  value: string;
  prevYear?: string;
  prevValue?: string;
  changeTag: string;
  method: string;
  direction: string;
  nationalValue?: string;
  nationalNote?: string;
  source: string;
}

interface DominioCsvRow {
  code: string;
  state: string;
  impulsores: string;
  cadena: string;
  entorno: string;
  consumidor: string;
  resultados: string;
  igta: string;
}

interface NacionalCsvRow {
  domain: string;
  value: string;
}

interface RelacionCsvRow {
  relation: string;
  code: string;
  state: string;
  x: string;
  y: string;
}

interface CorrelacionCsvRow {
  relation: string;
  xLabel: string;
  yLabel: string;
  n: string;
  pearson: string;
  spearman: string;
}

// ── Public shapes consumed by the page/components ───────────────────────────

export interface IndicatorEntry {
  name: string;
  subtopic?: string;
  domain: DomainKey;
  year: number | null;
  value: number | null;
  prevYear: number | null;
  prevValue: number | null;
  trend: Trend;
  method: string;
  direction: Direction;
  nationalValue: number | null;
  nationalFallback: boolean;
  source: string;
}

export type DomainScores = Record<DomainKey, number> & { igta: number };

export interface RelationPoint {
  code: string;
  state: string;
  x: number;
  y: number;
}

export interface Relation {
  key: string;
  xLabel: string;
  yLabel: string;
  points: RelationPoint[];
  n: number;
  pearson: number;
  spearman: number;
}

export interface IndicadoresDataset {
  /** Ordered by INEGI code, 01–32. */
  states: string[];
  stateCodes: Record<string, string>;
  domainScores: Record<string, DomainScores>;
  nationalScores: DomainScores;
  /** state -> domain -> indicator list, in the order they appear in the source matrix. */
  indicatorsByState: Record<string, Record<DomainKey, IndicatorEntry[]>>;
  relations: Record<string, Relation>;
}

function emptyDomainBucket<T>(): Record<DomainKey, T[]> {
  return { impulsores: [], cadena: [], entorno: [], consumidor: [], resultados: [] };
}

export async function fetchIndicadoresFromAzure(): Promise<IndicadoresDataset> {
  const urls = {
    indicadores: resolveDataBlobUrl(BLOB_PATHS.indicadoresPorEstado),
    dominios: resolveDataBlobUrl(BLOB_PATHS.indicadoresDominios),
    nacional: resolveDataBlobUrl(BLOB_PATHS.indicadoresNacional),
    relaciones: resolveDataBlobUrl(BLOB_PATHS.indicadoresRelaciones),
    correlaciones: resolveDataBlobUrl(BLOB_PATHS.indicadoresCorrelaciones),
  };

  const [indicadorRows, dominioRows, nacionalRows, relacionRows, correlacionRows] = await Promise.all([
    fetchCsvRows<IndicadorCsvRow>({ url: urls.indicadores }),
    fetchCsvRows<DominioCsvRow>({ url: urls.dominios }),
    fetchCsvRows<NacionalCsvRow>({ url: urls.nacional }),
    fetchCsvRows<RelacionCsvRow>({ url: urls.relaciones }),
    fetchCsvRows<CorrelacionCsvRow>({ url: urls.correlaciones }),
  ]);

  // ── domainScores + states (ordered by INEGI code) ──
  const sortedDomRows = [...dominioRows].sort((a, b) => a.code.localeCompare(b.code));
  const states = sortedDomRows.map((r) => r.state);
  const stateCodes: Record<string, string> = {};
  const domainScores: Record<string, DomainScores> = {};
  for (const r of sortedDomRows) {
    stateCodes[r.state] = r.code;
    domainScores[r.state] = {
      impulsores: Number(r.impulsores),
      cadena: Number(r.cadena),
      entorno: Number(r.entorno),
      consumidor: Number(r.consumidor),
      resultados: Number(r.resultados),
      igta: Number(r.igta),
    };
  }

  // ── nationalScores ──
  const nationalScores = {} as DomainScores;
  for (const r of nacionalRows) {
    const key = r.domain.trim() as DomainKey | "igta";
    if (key === "igta" || DOMAIN_KEYS.includes(key as DomainKey)) {
      (nationalScores as Record<string, number>)[key] = Number(r.value);
    }
  }

  // ── indicatorsByState ──
  const indicatorsByState: Record<string, Record<DomainKey, IndicatorEntry[]>> = {};
  for (const state of states) indicatorsByState[state] = emptyDomainBucket<IndicatorEntry>();

  for (const r of indicadorRows) {
    const domain = DOMAIN_LABEL_TO_KEY[r.domain.trim()];
    if (!domain) continue;
    const bucket = indicatorsByState[r.state];
    if (!bucket) continue;
    bucket[domain].push({
      name: r.indicator.trim(),
      subtopic: r.subtopic?.trim() || undefined,
      domain,
      year: toNum(r.year),
      value: toNum(r.value),
      prevYear: toNum(r.prevYear),
      prevValue: toNum(r.prevValue),
      trend: toTrend(r.changeTag),
      method: r.method.trim(),
      direction: toDirection(r.direction),
      nationalValue: toNum(r.nationalValue),
      nationalFallback: !!r.nationalNote?.trim(),
      source: r.source.trim(),
    });
  }

  // ── relations + correlations ──
  const relations: Record<string, Relation> = {};
  for (const c of correlacionRows) {
    relations[c.relation] = {
      key: c.relation,
      xLabel: c.xLabel,
      yLabel: c.yLabel,
      points: [],
      n: Number(c.n),
      pearson: Number(c.pearson),
      spearman: Number(c.spearman),
    };
  }
  for (const r of relacionRows) {
    const rel = relations[r.relation];
    if (!rel) continue;
    const x = toNum(r.x);
    const y = toNum(r.y);
    if (x === null || y === null) continue;
    rel.points.push({ code: r.code, state: r.state, x, y });
  }

  return { states, stateCodes, domainScores, nationalScores, indicatorsByState, relations };
}
