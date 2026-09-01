import { queryRag, RagQueryError } from "./client";

const ORIGINAL_ENV = process.env;

function mockFetchOnce(response: Partial<Response> & { json?: () => Promise<unknown> }) {
  global.fetch = jest.fn().mockResolvedValue(response as Response);
}

describe("queryRag", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV, RAG_API_URL: "https://rag.example.test" };
    delete process.env.NEXT_PUBLIC_RAG_API_URL;
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.restoreAllMocks();
  });

  it("posts the prompt with the required ngrok header and parses a successful response", async () => {
    mockFetchOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => ({
        answer: "Los sistemas alimentarios son...",
        has_coverage: true,
        sources: [
          { document: "Citas de entrevistas", quote_original: "algo relevante", score: 0.9 },
          { document: "Citas de entrevistas", quote_original: "otra cita", score: 0.8 },
        ],
      }),
    });

    const result = await queryRag("¿Qué es sistemas alimentarios?");

    expect(fetch).toHaveBeenCalledWith(
      "https://rag.example.test/api/v1/query",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        }),
        body: JSON.stringify({ prompt: "¿Qué es sistemas alimentarios?" }),
      })
    );
    expect(result.answer).toBe("Los sistemas alimentarios son...");
    expect(result.hasCoverage).toBe(true);
    expect(result.sources).toHaveLength(2);
    expect(result.sources[0]).toEqual({
      document: "Citas de entrevistas",
      quoteOriginal: "algo relevante",
      score: 0.9,
    });
  });

  it("defaults hasCoverage/sources when the fields are absent", async () => {
    mockFetchOnce({ ok: true, status: 200, statusText: "OK", json: async () => ({ answer: "Respuesta corta." }) });

    const result = await queryRag("hola");

    expect(result).toEqual({ answer: "Respuesta corta.", hasCoverage: false, sources: [] });
  });

  it("throws a 'not-configured' RagQueryError when RAG_API_URL is unset", async () => {
    delete process.env.RAG_API_URL;
    global.fetch = jest.fn();

    await expect(queryRag("hola")).rejects.toMatchObject({ kind: "not-configured" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws an 'api' RagQueryError on a non-OK HTTP status (e.g. 422 validation error)", async () => {
    mockFetchOnce({
      ok: false,
      status: 422,
      statusText: "Unprocessable Entity",
      json: async () => ({ error: "validation_error" }),
    });

    await expect(queryRag("")).rejects.toBeInstanceOf(RagQueryError);
    await expect(queryRag("")).rejects.toMatchObject({ kind: "api" });
  });

  it("throws an 'invalid-response' RagQueryError when 'answer' is missing", async () => {
    mockFetchOnce({ ok: true, status: 200, statusText: "OK", json: async () => ({ foo: "bar" }) });

    await expect(queryRag("hola")).rejects.toMatchObject({ kind: "invalid-response" });
  });

  it("throws a 'timeout' RagQueryError when the request is aborted", async () => {
    global.fetch = jest.fn().mockImplementation((_url, init) => {
      return new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const err = new Error("aborted");
          err.name = "AbortError";
          reject(err);
        });
      });
    });

    await expect(queryRag("hola", { timeoutMs: 10 })).rejects.toMatchObject({ kind: "timeout" });
  });

  it("throws a 'network' RagQueryError when fetch rejects with a non-abort error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("fetch failed"));

    await expect(queryRag("hola")).rejects.toMatchObject({ kind: "network" });
  });

  it("prefers NEXT_PUBLIC_RAG_API_URL when set (Azure server-env workaround)", async () => {
    process.env.NEXT_PUBLIC_RAG_API_URL = "https://public.example.test";
    mockFetchOnce({ ok: true, status: 200, statusText: "OK", json: async () => ({ answer: "ok" }) });

    await queryRag("hola");

    expect(fetch).toHaveBeenCalledWith("https://public.example.test/api/v1/query", expect.anything());
  });
});
