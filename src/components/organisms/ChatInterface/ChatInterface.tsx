"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatSidebar } from "@/components/organisms/ChatSidebar";
import { ChatWelcomePrompt } from "@/components/molecules/ChatWelcomePrompt";
import { ChatUserMessage } from "@/components/molecules/ChatUserMessage";
import { ChatAssistantMessage } from "@/components/molecules/ChatAssistantMessage";
import { ChatInputBar } from "@/components/molecules/ChatInputBar";
import type { ChatTopic } from "@/components/organisms/ChatSidebar";
import type { ChatSuggestion } from "@/components/molecules/ChatWelcomePrompt";
import type { ChatChip } from "@/components/molecules/ChatInputBar";
import type { ChatAssistantItem, ChatFollowUp } from "@/components/molecules/ChatAssistantMessage";

// ── Message types ──────────────────────────────────────────

export interface UserEntry {
  id: string;
  role: "user";
  message: string;
}

export interface AssistantEntry {
  id: string;
  role: "assistant";
  markdown?: string;
  intro?: string;
  items?: ChatAssistantItem[];
  citation?: string;
  followUps?: ChatFollowUp[];
  isLoading?: boolean;
}

export type ChatEntry = UserEntry | AssistantEntry;

// ── Props ──────────────────────────────────────────────────

export interface ChatInterfaceProps {
  topics?: ChatTopic[];
  suggestions?: ChatSuggestion[];
  contextChips?: ChatChip[];
  initialMessages?: ChatEntry[];
  /**
   * Called when the user sends a message. Return the assistant reply to
   * replace the loading bubble. Returning null/undefined leaves it loading.
   */
  onSend?: (message: string) => Promise<Omit<AssistantEntry, "id" | "role"> | null | undefined>;
  onTopicSelect?: (topic: string) => void;
  methodologyNote?: string;
  methodologyLink?: string;
  onMethodologyClick?: () => void;
  className?: string;
}

// ── Helpers ────────────────────────────────────────────────

let _counter = 0;
function uid() {
  return `msg-${++_counter}`;
}

// ── Component ──────────────────────────────────────────────

export function ChatInterface({
  topics,
  suggestions = [],
  contextChips = [],
  initialMessages = [],
  onSend,
  onTopicSelect,
  methodologyNote,
  methodologyLink,
  onMethodologyClick,
  className,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatEntry[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Topics with active state + click handler
  const resolvedTopics: ChatTopic[] = (topics ?? []).map((t) => ({
    ...t,
    active: t.label === selectedTopic,
    onClick: () => {
      setSelectedTopic(t.label);
      onTopicSelect?.(t.label);
    },
  }));

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setInputValue("");

    const userEntry: UserEntry = { id: uid(), role: "user", message: trimmed };
    const loadingId = uid();
    const loadingEntry: AssistantEntry = { id: loadingId, role: "assistant", isLoading: true };

    setMessages((prev) => [...prev, userEntry, loadingEntry]);

    if (onSend) {
      const reply = await onSend(trimmed);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? {
                id: loadingId,
                role: "assistant" as const,
                ...(reply ?? { markdown: "Sin respuesta disponible." }),
              }
            : m
        )
      );
    }
  }

  const hasMessages = messages.length > 0;

  return (
    // py-9 = 36px top/bottom padding (from design VbxuJ), gap-9 = 36px between panels
    <div className={cn("flex h-full gap-9 py-9 overflow-hidden", className)}>

      {/* ── Sidebar — bg #ffffffcc (80% white) ── */}
      <ChatSidebar
        topics={resolvedTopics}
        methodologyNote={methodologyNote}
        methodologyLink={methodologyLink}
        onMethodologyClick={onMethodologyClick}
      />

      {/* ── Main content — bg #ffffffe5 (~90% white), rounded, clips overflow ── */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#ffffffe5]">

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex min-h-full items-center justify-center px-8 py-16"
              >
                <ChatWelcomePrompt
                  suggestions={suggestions.map((s) => ({
                    ...s,
                    onClick: () => {
                      s.onClick?.();
                      send(s.text);
                    },
                  }))}
                />
              </motion.div>
            ) : (
              <motion.div
                key="thread"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mx-auto flex w-full max-w-[860px] flex-col gap-4 px-8 py-8"
              >
                {messages.map((entry) =>
                  entry.role === "user" ? (
                    <ChatUserMessage key={entry.id} message={entry.message} />
                  ) : (
                    <ChatAssistantMessage
                      key={entry.id}
                      markdown={entry.markdown}
                      intro={entry.intro}
                      items={entry.items}
                      citation={entry.citation}
                      followUps={entry.followUps?.map((f) => ({
                        ...f,
                        onClick: () => {
                          f.onClick?.();
                          send(f.text);
                        },
                      }))}
                      isLoading={entry.isLoading}
                    />
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar — sticky at bottom */}
        <ChatInputBar
          chips={contextChips}
          value={inputValue}
          onChange={setInputValue}
          onSend={send}
        />
      </div>

    </div>
  );
}
