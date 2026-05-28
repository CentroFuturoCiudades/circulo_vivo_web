"use client";
import { useChatStore } from "@/stores/useChatStore";

export function useChatbot() {
  const { messages, isLoading, addMessage, setLoading, clearMessages } = useChatStore();

  async function sendMessage(content: string) {
    addMessage({ role: "user", content });
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await response.json();
      addMessage({ role: "assistant", content: data.reply });
    } finally {
      setLoading(false);
    }
  }

  return { messages, isLoading, sendMessage, clearMessages };
}
