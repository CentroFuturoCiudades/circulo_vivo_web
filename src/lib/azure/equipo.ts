import type { MiembroTecnico, MiembroTecnicoSocial } from "@/components/organisms/EquipoTecnicoSection";
import type { Colaborador, InstitutionLogo } from "@/components/organisms/ColaboracionesSection";
import type { Directivo } from "@/components/organisms/DirectivosSection";
import { fetchCsvRows, resolveAzureImageUrl } from "./csv";

// ── Directivos ────────────────────────────────────────────────

interface DirectivoCsvRow {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
}

function rowToDirectivo(row: DirectivoCsvRow): Directivo {
  return {
    name: row.name,
    role: row.role,
    description: row.description,
    imageUrl: resolveAzureImageUrl(row.imageUrl),
  };
}

/** Fetches the directivos CSV from Azure Blob Storage. Pass the blob URL once the bucket exists. */
export async function fetchDirectivosFromAzure(url: string): Promise<Directivo[]> {
  const rows = await fetchCsvRows<DirectivoCsvRow>({ url });
  return rows.map(rowToDirectivo);
}

// ── Equipo Técnico ───────────────────────────────────────────

interface EquipoTecnicoCsvRow {
  name: string;
  role: string;
  tag: string;
  imageUrl?: string;
  description?: string;
  doctorado?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

function rowToMiembroTecnico(row: EquipoTecnicoCsvRow): MiembroTecnico {
  const socials: MiembroTecnicoSocial[] = [
    row.linkedin  ? { platform: "linkedin" as const,  url: row.linkedin }  : null,
    row.twitter   ? { platform: "twitter" as const,   url: row.twitter }   : null,
    row.instagram ? { platform: "instagram" as const, url: row.instagram } : null,
    row.website   ? { platform: "website" as const,   url: row.website }   : null,
  ].filter((s): s is MiembroTecnicoSocial => s !== null);

  return {
    name: row.name,
    role: row.role,
    tag: row.tag,
    imageUrl: resolveAzureImageUrl(row.imageUrl),
    description: row.description || undefined,
    doctorado: row.doctorado || undefined,
    email: row.email || undefined,
    socials: socials.length > 0 ? socials : undefined,
  };
}

/** Fetches the equipo técnico CSV from Azure Blob Storage. Pass the blob URL once the bucket exists. */
export async function fetchEquipoTecnicoFromAzure(url: string): Promise<MiembroTecnico[]> {
  const rows = await fetchCsvRows<EquipoTecnicoCsvRow>({ url });
  return rows.map(rowToMiembroTecnico);
}

// ── Colaboradores ────────────────────────────────────────────

interface ColaboradorCsvRow {
  name: string;
  role: string;
  imageUrl?: string;
  description?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

function rowToColaborador(row: ColaboradorCsvRow): Colaborador {
  const socials: NonNullable<Colaborador["socials"]> = [
    row.linkedin  ? { platform: "linkedin" as const,  url: row.linkedin }  : null,
    row.twitter   ? { platform: "twitter" as const,   url: row.twitter }   : null,
    row.instagram ? { platform: "instagram" as const, url: row.instagram } : null,
    row.website   ? { platform: "website" as const,   url: row.website }   : null,
  ].filter((s): s is NonNullable<Colaborador["socials"]>[number] => s !== null);

  return {
    name: row.name,
    role: row.role,
    imageUrl: resolveAzureImageUrl(row.imageUrl),
    description: row.description || undefined,
    email: row.email || undefined,
    socials: socials.length > 0 ? socials : undefined,
  };
}

/** Fetches the colaboradores CSV from Azure Blob Storage. Pass the blob URL once the bucket exists. */
export async function fetchColaboradoresFromAzure(url: string): Promise<Colaborador[]> {
  const rows = await fetchCsvRows<ColaboradorCsvRow>({ url });
  return rows.map(rowToColaborador);
}

// ── Instituciones colaboradoras ──────────────────────────────

interface InstitucionCsvRow {
  name: string;
  logoUrl?: string;
}

function rowToInstitution(row: InstitucionCsvRow): InstitutionLogo {
  return {
    name: row.name,
    logoUrl: resolveAzureImageUrl(row.logoUrl),
  };
}

/** Fetches the instituciones colaboradoras CSV from Azure Blob Storage. Pass the blob URL once the bucket exists. */
export async function fetchInstitucionesFromAzure(url: string): Promise<InstitutionLogo[]> {
  const rows = await fetchCsvRows<InstitucionCsvRow>({ url });
  return rows.map(rowToInstitution);
}
