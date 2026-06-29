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

export function toInitiative(d: InitiativeData): Initiative | null {
  // Drop entries that are missing the two fields the map absolutely requires
  if (!d?.id?.trim() || !d?.title?.trim()) return null;

  const geoState   = d.geoState?.trim()   ?? "";
  const actorType  = d.actorType?.trim()  as ActorType;
  const component  = d.component?.trim()  as SystemComponent;
  const scale      = d.scale?.trim()      as Scale;

  const chips: Array<{ label: string; color?: ChipColor }> = [
    geoState  ? { label: geoState,  color: "gold"                                        } : null,
    actorType ? { label: actorType, color: ACTOR_COLOR[actorType]   ?? "neutral"         } : null,
    component ? { label: component, color: COMPONENT_COLOR[component] ?? "neutral"       } : null,
    scale     ? { label: scale,     color: "secondary"                                   } : null,
  ].filter((c): c is { label: string; color: ChipColor } => c !== null);

  const presenceStates = (d.presenceStates ?? [])
    .map((s) => s?.trim())
    .filter((s): s is string => Boolean(s) && s !== geoState);

  const locationParts = [d.city?.trim(), geoState].filter(Boolean);

  return {
    id:             d.id.trim(),
    title:          d.title.trim(),
    description:    d.description?.trim() ?? "",
    websiteUrl:     d.websiteUrl?.trim()  || undefined,
    state:          geoState              || undefined,
    presenceStates: presenceStates.length > 0 ? presenceStates : undefined,
    location:       locationParts.length  > 0 ? locationParts.join(", ") : undefined,
    chips,
  };
}
