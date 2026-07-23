import type { Initiative } from "@/components/organisms/InitiativesMap";
import { fetchIniciativasFromAzure } from "@/lib/azure/iniciativas";
import { BLOB_PATHS, resolveDataBlobUrl } from "@/lib/azure/paths";
import { dataResultOk, type DataResult } from "./types";

/**
 * Fetches the iniciativas dataset from the `datos` container in Azure Blob Storage
 * if `AZURE_STORAGE_ACCOUNT_URL` is set. We deliberately never fall back to the
 * local `mapa/data.ts` fixtures on
 * failure — that data is stale/fake, so the caller must handle `unconfigured`/`error`
 * explicitly (see `DataUnavailableMessage`).
 */
export async function getIniciativas(): Promise<DataResult<Initiative[]>> {
  const url = resolveDataBlobUrl(BLOB_PATHS.iniciativas);
  if (!url) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchIniciativasFromAzure(url));
  } catch (err) {
    console.error("getIniciativas: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}
