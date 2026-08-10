import Papa from "papaparse";
import { resolveImageBlobUrl } from "./paths";

/**
 * Server-only helpers for fetching CSV data from Azure Blob Storage containers
 * protected by a SAS (Shared Access Signature) token.
 *
 * The container must NOT have anonymous public access enabled — a SAS token only
 * gates access on resources that are otherwise private. All functions here are
 * meant to run on the server (Server Components / Route Handlers): the token must
 * never be sent to the client, so never import this file from a "use client" module.
 */

export class CsvFetchError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "CsvFetchError";
  }
}

export interface FetchCsvOptions {
  /** Full blob URL, e.g. "https://<account>.blob.core.windows.net/<container>/archivo.csv". */
  url: string | undefined;
  /**
   * SAS token query string (with or without the leading "?").
   * Defaults to `process.env.AZURE_BLOB_SAS_TOKEN` — a single container-level
   * read-only SAS reused across every CSV/image URL is the simplest setup.
   */
  token?: string;
  /** Next.js fetch cache revalidation window, in seconds. Defaults to 1 hour. */
  revalidateSeconds?: number;
}

/** Appends a SAS token to a blob URL as a query string, if one is provided. */
export function withSasToken(url: string, token?: string): string {
  if (!token) return url;
  const cleanToken = token.startsWith("?") ? token.slice(1) : token;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${cleanToken}`;
}

/**
 * Resolves an `imageUrl`/`logoUrl` cell from a CSV row into a fully-signed URL,
 * ready to use directly in `<img src>` on the client. Images live in the
 * separate `imagenes` container (see ./paths.ts), signed with the same
 * account-level `AZURE_BLOB_SAS_TOKEN`.
 *
 * Handles three cases so CSV authors don't have to worry about signing anything:
 *  - relative path (e.g. "equipo/juan.jpg")                → resolved against the `imagenes` container, then signed
 *  - absolute URL without a token (copy-pasted from Azure) → signed
 *  - absolute URL that's already signed                    → left as-is
 */
export function resolveAzureImageUrl(raw?: string): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;

  const isAbsolute = /^https?:\/\//i.test(value);
  if (!isAbsolute) {
    const resolved = resolveImageBlobUrl(value);
    if (!resolved) return value; // nothing to resolve against — return as-is rather than dropping the image entirely
    return withSasToken(resolved, process.env.AZURE_BLOB_SAS_TOKEN);
  }

  if (value.includes("sig=")) return value; // already signed — don't touch it
  return withSasToken(value, process.env.AZURE_BLOB_SAS_TOKEN);
}

/**
 * Fetches a CSV blob from Azure and parses it into an array of row objects
 * (keyed by the CSV's header row).
 *
 * Pass just the `url` — the SAS token is picked up automatically from
 * `AZURE_BLOB_SAS_TOKEN` unless overridden.
 */
export async function fetchCsvRows<T = Record<string, string>>(
  options: FetchCsvOptions
): Promise<T[]> {
  const { url, revalidateSeconds = 3600 } = options;

  if (!url) {
    throw new CsvFetchError("fetchCsvRows: no se proporcionó una URL de blob.");
  }

  const token = options.token ?? process.env.AZURE_BLOB_SAS_TOKEN;
  const signedUrl = withSasToken(url, token);

  let res: Response;
  try {
    res = await fetch(signedUrl, { next: { revalidate: revalidateSeconds } });
  } catch (err) {
    throw new CsvFetchError(`fetchCsvRows: fallo de red al pedir ${url}`, err);
  }

  if (!res.ok) {
    throw new CsvFetchError(`fetchCsvRows: Azure respondió ${res.status} ${res.statusText} para ${url}`);
  }

  const csvText = await res.text();
  const parsed = Papa.parse<T>(csvText, {
    header: true,
    skipEmptyLines: true,
    transform: (value) => value.trim(),
  });

  if (parsed.errors.length > 0) {
    const [first] = parsed.errors;
    throw new CsvFetchError(`fetchCsvRows: error al parsear CSV (fila ${first.row}): ${first.message}`);
  }

  return parsed.data;
}
