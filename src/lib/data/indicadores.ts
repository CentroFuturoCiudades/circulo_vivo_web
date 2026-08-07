import { fetchIndicadoresFromAzure, type IndicadoresDataset } from "@/lib/azure/indicadores";
import { resolveDataBlobUrl } from "@/lib/azure/paths";
import { dataResultOk, type DataResult } from "./types";

/**
 * Fetches the indicadores dataset (5 CSVs: indicadores, dominios, nacional,
 * relaciones, correlaciones) from the `datos` container in Azure Blob Storage
 * if `AZURE_STORAGE_ACCOUNT_URL` is set. We deliberately never fall back to
 * fake/stale local data on failure — the caller must handle
 * `unconfigured`/`error` explicitly (see `DataUnavailableMessage`).
 */
export async function getIndicadores(): Promise<DataResult<IndicadoresDataset>> {
  // Any one of the 5 blob paths resolving to undefined means the account URL
  // isn't configured — treat the whole dataset as unconfigured.
  if (!resolveDataBlobUrl("indicadores/csv/indicadores.csv")) return { status: "unconfigured" };

  try {
    return dataResultOk(await fetchIndicadoresFromAzure());
  } catch (err) {
    console.error("getIndicadores: fallo al obtener datos de Azure.", err);
    return { status: "error", message: err instanceof Error ? err.message : "Error desconocido" };
  }
}
