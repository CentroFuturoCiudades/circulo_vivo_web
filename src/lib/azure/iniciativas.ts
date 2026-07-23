import type { Initiative } from "@/components/organisms/InitiativesMap";
import { type InitiativeData, type ActorType, type SystemComponent, type Scale, toInitiative } from "@/app/mapa/types";
import { fetchCsvRows, resolveAzureImageUrl } from "./csv";

/** Raw CSV columns for the iniciativas sheet. Every cell arrives as a string. */
interface IniciativaCsvRow {
  id: string;
  title: string;
  city?: string;
  geoState: string;
  /** Other states with presence, separated by "|" (e.g. "Guanajuato|Hidalgo|México"). */
  presenceStates?: string;
  actorType: string;
  component: string;
  scale: string;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
}

function rowToInitiativeData(row: IniciativaCsvRow): InitiativeData {
  return {
    id: row.id,
    title: row.title,
    city: row.city || undefined,
    geoState: row.geoState,
    presenceStates: row.presenceStates
      ? row.presenceStates.split("|").map((s) => s.trim()).filter(Boolean)
      : undefined,
    actorType: row.actorType as ActorType,
    component: row.component as SystemComponent,
    scale: row.scale as Scale,
    description: row.description,
    imageUrl: resolveAzureImageUrl(row.imageUrl),
    websiteUrl: row.websiteUrl || undefined,
  };
}

/**
 * Fetches and maps the iniciativas CSV from Azure Blob Storage into the shape
 * `InitiativesMap` expects. Pass the blob URL once the bucket exists — the SAS
 * token is picked up automatically from `AZURE_BLOB_SAS_TOKEN`.
 */
export async function fetchIniciativasFromAzure(url: string): Promise<Initiative[]> {
  const rows = await fetchCsvRows<IniciativaCsvRow>({ url });
  return rows
    .map(rowToInitiativeData)
    .map(toInitiative)
    .filter((i): i is Initiative => i !== null);
}
