/**
 * Server-only client for the RAG (Retrieval-Augmented Generation) service that
 * answers questions over the sistemas alimentarios interview corpus.
 *
 * Contract (from Andrea Torres, data team, 2026-08-26): POST { prompt } to
 * `${NEXT_PUBLIC_RAG_API_URL}/api/v1/query`, with `ngrok-skip-browser-warning`
 * set while the service is exposed through a free ngrok tunnel — that tunnel
 * injects an HTML interstitial on requests without this header, which breaks
 * JSON parsing. Never import this file from a "use client" module — only read
 * server-side, despite the NEXT_PUBLIC_ prefix.
 */

// Requires the NEXT_PUBLIC_ prefix even though this only ever runs server-side:
// Azure App Service doesn't reliably pass server-only env vars through to the
// Next.js runtime here (same workaround as src/lib/azure/paths.ts). Falls back
// to the unprefixed name for local dev / other hosts.
function resolveRagBaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_RAG_API_URL || process.env.RAG_API_URL;
}

export type RagQueryErrorKind = "network" | "timeout" | "api" | "invalid-response" | "not-configured";

export class RagQueryError extends Error {
  constructor(
    message: string,
    public readonly kind: RagQueryErrorKind,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "RagQueryError";
  }
}

export interface RagSource {
  document: string;
  quoteOriginal: string;
  score: number;
}

export interface RagQueryResult {
  answer: string;
  hasCoverage: boolean;
  sources: RagSource[];
}

export interface QueryRagOptions {
  /** Request timeout in milliseconds. The service can take ~10s to respond. Defaults to 45s. */
  timeoutMs?: number;
}

/**
 * Sends a question to the RAG service and returns its answer plus supporting
 * source quotes. Throws `RagQueryError` on any failure — callers decide how to
 * present each `kind` to the user (timeout, network, api, etc).
 */
export async function queryRag(prompt: string, options: QueryRagOptions = {}): Promise<RagQueryResult> {
  const baseUrl = resolveRagBaseUrl();
  if (!baseUrl) {
    throw new RagQueryError("queryRag: RAG_API_URL no está configurado.", "not-configured");
  }

  const { timeoutMs = 45_000 } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${baseUrl.replace(/\/+$/, "")}/api/v1/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new RagQueryError(`queryRag: tiempo de espera agotado tras ${timeoutMs}ms`, "timeout", err);
    }
    throw new RagQueryError("queryRag: fallo de red al contactar el servicio RAG", "network", err);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    throw new RagQueryError(`queryRag: el servicio respondió ${res.status} ${res.statusText}`, "api");
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch (err) {
    throw new RagQueryError("queryRag: la respuesta no es JSON válido", "invalid-response", err);
  }

  if (typeof (data as { answer?: unknown })?.answer !== "string") {
    throw new RagQueryError("queryRag: la respuesta no tiene el campo 'answer' esperado", "invalid-response");
  }

  const payload = data as {
    answer: string;
    has_coverage?: unknown;
    sources?: unknown;
  };

  const sources: RagSource[] = Array.isArray(payload.sources)
    ? payload.sources.map((s) => {
        const source = s as { document?: unknown; quote_original?: unknown; score?: unknown };
        return {
          document: typeof source.document === "string" ? source.document : "",
          quoteOriginal: typeof source.quote_original === "string" ? source.quote_original : "",
          score: typeof source.score === "number" ? source.score : 0,
        };
      })
    : [];

  return {
    answer: payload.answer,
    hasCoverage: Boolean(payload.has_coverage),
    sources,
  };
}
