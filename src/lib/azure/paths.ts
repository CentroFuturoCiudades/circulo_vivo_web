/**
 * CSVs and images live in two separate containers within the same storage
 * account, gated by the same account-level SAS token: `datos` and `imagenes`.
 * Only the account root URL is configured — container names are fixed here.
 */

const DATA_CONTAINER = "datos";
const IMAGES_CONTAINER = "imagenes";

/** Relative blob paths within the `datos` container. Fixed by the data team. */
export const BLOB_PATHS = {
  directivos: "equipo/csv/directivos.csv",
  equipoTecnico: "equipo/csv/tecnico.csv",
  colaboradores: "equipo/csv/colaboradores.csv",
  instituciones: "equipo/csv/instituciones.csv",
  iniciativas: "mapa/csv/iniciativas.csv",
  indicadoresPorEstado: "indicadores/csv/indicadores.csv",
  indicadoresDominios: "indicadores/csv/dominios.csv",
  indicadoresNacional: "indicadores/csv/nacional.csv",
  indicadoresRelaciones: "indicadores/csv/relaciones.csv",
  indicadoresCorrelaciones: "indicadores/csv/correlaciones.csv",
} as const;

function resolveContainerUrl(container: string, relativePath: string): string | undefined {
  const account =
    process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_URL || process.env.AZURE_STORAGE_ACCOUNT_URL;
  if (!account) return undefined;
  return `${account.replace(/\/+$/, "")}/${container}/${relativePath.replace(/^\/+/, "")}`;
}

/**
 * Resolves a relative CSV path (e.g. "equipo/csv/tecnico.csv") into a full URL
 * in the `datos` container, against `NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_URL`
 * (e.g. "https://<account>.blob.core.windows.net"). Returns undefined if the
 * account URL isn't configured — callers should treat the dataset as unavailable.
 */
export function resolveDataBlobUrl(relativePath: string): string | undefined {
  return resolveContainerUrl(DATA_CONTAINER, relativePath);
}

/**
 * Resolves a relative image path (e.g. "equipo/juan.jpg") into a full URL in
 * the `imagenes` container. Used by `resolveAzureImageUrl` in ./csv.ts.
 */
export function resolveImageBlobUrl(relativePath: string): string | undefined {
  return resolveContainerUrl(IMAGES_CONTAINER, relativePath);
}
