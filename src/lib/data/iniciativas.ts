import type { Initiative } from "@/components/organisms/InitiativesMap";
import { dataResultOk, type DataResult } from "./types";
import iniciativasSnapshot from "@/data/snapshot/iniciativas.json";

/**
 * DEMO BRANCH — contingency for when Azure Blob env vars aren't available.
 * Serves a point-in-time snapshot of the real data (fetched from Azure once,
 * frozen into src/data/snapshot/iniciativas.json + public/data-snapshot/
 * images) instead of hitting Azure at request time. Never merge this branch
 * into dev/main — once the Azure env vars are confirmed working, this file
 * should go back to fetching live from Azure (see git history on dev).
 */
export async function getIniciativas(): Promise<DataResult<Initiative[]>> {
  return dataResultOk(iniciativasSnapshot as Initiative[]);
}
