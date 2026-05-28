"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ChatMessage } from "@/types/chatbot";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  immer((set) => ({
    messages: [],
    isLoading: false,
    addMessage: (msg) =>
      set((state) => {
        state.messages.push({
          ...msg,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        });
      }),
    setLoading: (loading) =>
      set((state) => { state.isLoading = loading; }),
    clearMessages: () =>
      set((state) => { state.messages = []; }),
  }))
);
