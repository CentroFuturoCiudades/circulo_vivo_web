import { getChatbotReply } from "./chatbot";
import { queryRag, RagQueryError } from "@/lib/rag/client";

jest.mock("@/lib/rag/client", () => {
  const actual = jest.requireActual("@/lib/rag/client");
  return { ...actual, queryRag: jest.fn() };
});

const mockedQueryRag = queryRag as jest.MockedFunction<typeof queryRag>;

describe("getChatbotReply", () => {
  afterEach(() => jest.resetAllMocks());

  it("returns markdown + a citation summarizing unique source documents", async () => {
    mockedQueryRag.mockResolvedValue({
      answer: "Respuesta con fuentes.",
      hasCoverage: true,
      sources: [
        { document: "Citas de entrevistas", quoteOriginal: "a", score: 1 },
        { document: "Citas de entrevistas", quoteOriginal: "b", score: 1 },
        { document: "Motivaciones", quoteOriginal: "c", score: 1 },
      ],
    });

    const reply = await getChatbotReply("¿Qué es sistemas alimentarios?");

    expect(reply).toEqual({
      markdown: "Respuesta con fuentes.",
      citation: "Fuentes: Citas de entrevistas, Motivaciones",
    });
  });

  it("omits citation when there are no sources", async () => {
    mockedQueryRag.mockResolvedValue({ answer: "Sin fuentes.", hasCoverage: false, sources: [] });

    const reply = await getChatbotReply("hola");

    expect(reply).toEqual({ markdown: "Sin fuentes.", citation: undefined });
  });

  it("returns a 'no-response' fallback for a blank prompt without calling the RAG service", async () => {
    const reply = await getChatbotReply("   ");

    expect(reply).toEqual({ error: "no-response" });
    expect(mockedQueryRag).not.toHaveBeenCalled();
  });

  it("returns a 'no-response' fallback when the service answers with empty text", async () => {
    mockedQueryRag.mockResolvedValue({ answer: "   ", hasCoverage: false, sources: [] });

    const reply = await getChatbotReply("hola");

    expect(reply).toEqual({ error: "no-response" });
  });

  it("maps a timeout RagQueryError to the 'timeout' fallback variant", async () => {
    mockedQueryRag.mockRejectedValue(new RagQueryError("timed out", "timeout"));

    const reply = await getChatbotReply("hola");

    expect(reply).toEqual({ error: "timeout" });
  });

  it("maps a network RagQueryError to the 'network-error' fallback variant", async () => {
    mockedQueryRag.mockRejectedValue(new RagQueryError("network down", "network"));

    const reply = await getChatbotReply("hola");

    expect(reply).toEqual({ error: "network-error" });
  });

  it("maps any other failure (api, invalid-response, not-configured, unknown) to 'api-error'", async () => {
    mockedQueryRag.mockRejectedValue(new RagQueryError("bad shape", "invalid-response"));
    await expect(getChatbotReply("hola")).resolves.toEqual({ error: "api-error" });

    mockedQueryRag.mockRejectedValue(new Error("boom"));
    await expect(getChatbotReply("hola")).resolves.toEqual({ error: "api-error" });
  });
});
