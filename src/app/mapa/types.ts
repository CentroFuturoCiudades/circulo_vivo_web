import type { Initiative } from "@/components/organisms/InitiativesMap";

// ── Domain enums ───────────────────────────────────────────────────────────

export type PresenceType = "sede" | "presencia";

export type ActorType =
  | "Sector privado"
  | "Sociedad civil"
  | "Academia"
  | "Gobierno"
  | "Cooperativa"
  | "Mixto";

export type SystemComponent =
  | "Producción"
  | "Consumo y acceso"
  | "Distribución y comercialización"
  | "Transformación e innovación"
  | "Gobernanza e incidencia"
  | "Redes y organización comunitaria"
  | "Financiamiento y soporte institucional";

export type Scale =
  | "Local"
  | "Regional"
  | "Estatal"
  | "Nacional"
  | "Internacional";

// ── Raw data shape (sourced from CSV) ─────────────────────────────────────

export interface InitiativeData {
  id: string;
  title: string;
  /** Specific city. Omit for national-scope initiatives or when only the state is known. */
  city?: string;
  /** Full Spanish state name matching GeoJSON — omit for purely national initiatives */
  geoState?: string;
  actorType: ActorType;
  component: SystemComponent;
  scale: Scale;
  /** Whether this is the initiative's main office (sede) or a presence/branch only. Omit when not applicable. */
  presenceType?: PresenceType;
  description: string;
  websiteUrl?: string;
  lat: number;
  lng: number;
}

// ── Chip color maps ────────────────────────────────────────────────────────

type ChipColor = "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";

const PRESENCE_COLOR: Record<PresenceType, ChipColor> = {
  sede:      "crimson",
  presencia: "secondary",
};

const PRESENCE_MARKER_COLOR: Record<PresenceType, string> = {
  sede:      "#852038",
  presencia: "#395284",
};

const ACTOR_COLOR: Record<ActorType, ChipColor> = {
  "Sector privado": "teal",
  "Sociedad civil": "secondary",
  "Academia":       "purple",
  "Gobierno":       "crimson",
  "Cooperativa":    "neutral",
  "Mixto":          "neutral",
};

const COMPONENT_COLOR: Record<SystemComponent, ChipColor> = {
  "Producción":                          "teal",
  "Consumo y acceso":                    "gold",
  "Distribución y comercialización":     "secondary",
  "Transformación e innovación":         "purple",
  "Gobernanza e incidencia":             "crimson",
  "Redes y organización comunitaria":    "neutral",
  "Financiamiento y soporte institucional": "neutral",
};

// ── Converter ──────────────────────────────────────────────────────────────

/**
 * Converts raw CSV-sourced data into the Initiative shape expected by
 * InitiativesMap.  Chip order matters for InitiativeList's auto-derived
 * filters: chips[0] → Estado filter, chips[1+] → Tema filter.
 */
export function toInitiative(d: InitiativeData): Initiative {
  const chips: Array<{ label: string; color?: ChipColor }> = [];

  if (d.geoState) chips.push({ label: d.geoState, color: "gold" });
  chips.push({ label: d.actorType,  color: ACTOR_COLOR[d.actorType]     });
  chips.push({ label: d.component,  color: COMPONENT_COLOR[d.component] });
  chips.push({ label: d.scale,      color: "secondary"                   });
  if (d.presenceType) chips.push({ label: d.presenceType === "sede" ? "Sede" : "Presencia", color: PRESENCE_COLOR[d.presenceType] });

  const locationParts = [d.city, d.geoState].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(", ") : undefined;

  return {
    id:           d.id,
    lat:          d.lat,
    lng:          d.lng,
    title:        d.title,
    description:  d.description,
    websiteUrl:   d.websiteUrl,
    state:        d.geoState,
    location,
    presenceType: d.presenceType,
    markerColor:  d.presenceType ? PRESENCE_MARKER_COLOR[d.presenceType] : undefined,
    chips,
  };
}
