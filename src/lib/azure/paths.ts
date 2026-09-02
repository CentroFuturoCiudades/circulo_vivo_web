/**
 * CSVs, images and videos live in separate containers within the same storage
 * account, gated by the same account-level SAS token: `datos`, `imagenes` and
 * `videos`. Only the account root URL is configured — container names are
 * fixed here.
 */

const DATA_CONTAINER = "datos";
const IMAGES_CONTAINER = "imagenes";
const VIDEOS_CONTAINER = "videos";

/** Relative blob paths within the `datos` container. Fixed by the data team. */
export const BLOB_PATHS = {
  directivos: "equipo/csv/directivos.csv",
  equipoTecnico: "equipo/csv/tecnico.csv",
  colaboradores: "equipo/csv/colaboradores.csv",
  instituciones: "equipo/csv/instituciones.csv",
  iniciativas: "mapa/csv/iniciativas.csv",
} as const;

function resolveContainerUrl(container: string, relativePath: string): string | undefined {
  // TEMP diagnostic: try the NEXT_PUBLIC_-prefixed name first, in case Azure
  // Application Settings aren't reaching server-only env vars at runtime.
  const account = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_URL || process.env.AZURE_STORAGE_ACCOUNT_URL;
  if (!account) return undefined;
  return `${account.replace(/\/+$/, "")}/${container}/${relativePath.replace(/^\/+/, "")}`;
}

/**
 * Resolves a relative CSV path (e.g. "equipo/csv/tecnico.csv") into a full URL
 * in the `datos` container, against `AZURE_STORAGE_ACCOUNT_URL`
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

/**
 * Resolves a relative video path (e.g. "home/hero-bg.mp4") into a full URL in
 * the `videos` container.
 */
export function resolveVideoBlobUrl(relativePath: string): string | undefined {
  return resolveContainerUrl(VIDEOS_CONTAINER, relativePath);
}

// TEMP diagnostic: try the NEXT_PUBLIC_-prefixed name first, in case Azure
// Application Settings aren't reaching server-only env vars at runtime.
function resolveSasToken(): string | undefined {
  return process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_TOKEN || process.env.AZURE_BLOB_SAS_TOKEN;
}

/** Appends a SAS token to a blob URL as a query string, if one is provided. */
export function withSasToken(url: string, token?: string): string {
  if (!token) return url;
  const cleanToken = token.startsWith("?") ? token.slice(1) : token;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${cleanToken}`;
}

/**
 * Resolves a relative video path into a fully-signed URL, ready to use
 * directly in a `<video src>` on the client — mirrors `resolveAzureImageUrl`
 * in ./csv.ts but skips the CSV-authored-absolute-URL cases, since video
 * paths are hardcoded in components rather than coming from a CSV cell.
 */
export function resolveSignedVideoUrl(relativePath: string): string | undefined {
  const resolved = resolveVideoBlobUrl(relativePath);
  if (!resolved) return undefined;
  return withSasToken(resolved, resolveSasToken());
}

/**
 * Resolves a relative image path into a fully-signed URL, ready to use
 * directly in an `<img src>` on the client. Same as `resolveSignedVideoUrl`
 * but for the `imagenes` container — for hardcoded paths (e.g. a `<video>`
 * poster frame), not CSV-authored cells (see `resolveAzureImageUrl` in ./csv.ts
 * for that case).
 */
export function resolveSignedImageUrl(relativePath: string): string | undefined {
  const resolved = resolveImageBlobUrl(relativePath);
  if (!resolved) return undefined;
  return withSasToken(resolved, resolveSasToken());
}
