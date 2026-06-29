import type { Initiative } from "@/components/organisms/InitiativesMap";

// ── Domain enums ───────────────────────────────────────────────────────────

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

// ── Raw data shape ─────────────────────────────────────────────────────────

export interface InitiativeData {
  id: string;
  title: string;
  /** Specific city within the sede state. Optional. */
  city?: string;
  /** Full Spanish state name of the sede (HQ). Must match GeoJSON property "name". */
  geoState: string;
  /**
   * Other states where this initiative has presence.
   * Each entry must match the GeoJSON "name" property exactly.
   * Shown on the map in a distinct color when the initiative is selected.
   */
  presenceStates?: string[];
  actorType: ActorType;
  component: SystemComponent;
  scale: Scale;
  description: string;
  websiteUrl?: string;
}

// ── Chip color maps ────────────────────────────────────────────────────────

type ChipColor = "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";

const ACTOR_COLOR: Record<ActorType, ChipColor> = {
  "Sector privado": "teal",
  "Sociedad civil": "secondary",
  "Academia":       "purple",
  "Gobierno":       "crimson",
  "Cooperativa":    "neutral",
  "Mixto":          "neutral",
};

const COMPONENT_COLOR: Record<SystemComponent, ChipColor> = {
  "Producción":                             "teal",
  "Consumo y acceso":                       "gold",
  "Distribución y comercialización":        "secondary",
  "Transformación e innovación":            "purple",
  "Gobernanza e incidencia":                "crimson",
  "Redes y organización comunitaria":       "neutral",
  "Financiamiento y soporte institucional": "neutral",
};

// ── Converter ──────────────────────────────────────────────────────────────

export function toInitiative(d: InitiativeData): Initiative {
  const chips: Array<{ label: string; color?: ChipColor }> = [
    { label: d.geoState,  color: "gold"                       },
    { label: d.actorType, color: ACTOR_COLOR[d.actorType]     },
    { label: d.component, color: COMPONENT_COLOR[d.component] },
    { label: d.scale,     color: "secondary"                  },
  ];

  const locationParts = [d.city, d.geoState].filter(Boolean);

  return {
    id:             d.id,
    title:          d.title,
    description:    d.description,
    websiteUrl:     d.websiteUrl,
    state:          d.geoState,
    presenceStates: d.presenceStates,
    location:       locationParts.length > 0 ? locationParts.join(", ") : undefined,
    chips,
  };
}
