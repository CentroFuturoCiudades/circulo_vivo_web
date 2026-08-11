import type { MiembroTecnico } from "@/components/organisms/EquipoTecnicoSection";
import type { Colaborador, InstitutionLogo } from "@/components/organisms/ColaboracionesSection";
import type { Directivo } from "@/components/organisms/DirectivosSection";
import {
  fetchDirectivosFromAzure,
  fetchEquipoTecnicoFromAzure,
  fetchColaboradoresFromAzure,
  fetchInstitucionesFromAzure,
} from "@/lib/azure/equipo";
import { BLOB_PATHS, resolveDataBlobUrl } from "@/lib/azure/paths";
import { dataResultOk, type DataResult } from "./types";

/**
 * Each getter fetches from the `datos` container in Azure Blob Storage if
 * `AZURE_STORAGE_ACCOUNT_URL` is set, and returns a `DataResult` describing
 * what happened — we deliberately
 * never fall back to the local `equipo/data.ts` fixtures, since that data is
 * stale/fake and showing it silently would be misleading. Callers must handle
 * `unconfigured`/`error` explicitly (see `DataUnavailableMessage`).
 *
 * DirectivosSection is currently hidden on the equipo page (see equipo/page.tsx),
 * but its data-fetching is wired up here so it's ready whenever it comes back.
 */

export async function getDirectivos(): Promise<DataResult<Directivo[]>> {
  const url = resolveDataBlobUrl(BLOB_PATHS.directivos);
  if (!url) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchDirectivosFromAzure(url));
  } catch (err) {
    console.error("getDirectivos: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function getEquipoTecnico(): Promise<DataResult<MiembroTecnico[]>> {
  const url = resolveDataBlobUrl(BLOB_PATHS.equipoTecnico);
  if (!url) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchEquipoTecnicoFromAzure(url));
  } catch (err) {
    console.error("getEquipoTecnico: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function getEquipoColaboradores(): Promise<DataResult<Colaborador[]>> {
  const url = resolveDataBlobUrl(BLOB_PATHS.colaboradores);
  if (!url) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchColaboradoresFromAzure(url));
  } catch (err) {
    console.error("getEquipoColaboradores: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}

export async function getInstitucionesColaboradoras(): Promise<DataResult<InstitutionLogo[]>> {
  const url = resolveDataBlobUrl(BLOB_PATHS.instituciones);
  if (!url) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchInstitucionesFromAzure(url));
  } catch (err) {
    console.error("getInstitucionesColaboradoras: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}
