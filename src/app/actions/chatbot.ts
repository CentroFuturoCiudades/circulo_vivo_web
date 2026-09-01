"use server";

import { queryRag, RagQueryError } from "@/lib/rag/client";
import type { ChatFallbackVariant } from "@/components/molecules/ChatFallbackMessage";

export interface ChatbotReply {
  markdown: string;
  citation?: string;
}

export interface ChatbotFailure {
  error: ChatFallbackVariant;
}

/**
 * Sends `prompt` to the RAG service and maps its response (or failure) into
 * the shape `ChatInterface.onSend` expects. Recommended-question chips/pills
 * stay hardcoded in src/app/chatbot/page.tsx — per Andrea Torres's team, the
 * service doesn't provide those yet, so we're not wiring them dynamically.
 */
export async function getChatbotReply(prompt: string): Promise<ChatbotReply | ChatbotFailure> {
  const trimmed = prompt.trim();
  if (!trimmed) return { error: "no-response" };

  try {
    const result = await queryRag(trimmed);
    if (!result.answer.trim()) return { error: "no-response" };

    const documents = [...new Set(result.sources.map((s) => s.document).filter(Boolean))];

    return {
      markdown: result.answer,
      citation: documents.length ? `Fuentes: ${documents.join(", ")}` : undefined,
    };
  } catch (err) {
    if (err instanceof RagQueryError) {
      if (err.kind === "timeout") return { error: "timeout" };
      if (err.kind === "network") return { error: "network-error" };
    }
    return { error: "api-error" };
  }
}
