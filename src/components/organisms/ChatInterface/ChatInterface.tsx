"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { ChatSidebar } from "@/components/organisms/ChatSidebar";
import { ChatWelcomePrompt } from "@/components/molecules/ChatWelcomePrompt";
import { ChatUserMessage } from "@/components/molecules/ChatUserMessage";
import { ChatAssistantMessage } from "@/components/molecules/ChatAssistantMessage";
import { ChatFallbackMessage } from "@/components/molecules/ChatFallbackMessage";
import { ChatInputBar } from "@/components/molecules/ChatInputBar";
import type { ChatTopic } from "@/components/organisms/ChatSidebar";
import type { ChatSuggestion } from "@/components/molecules/ChatWelcomePrompt";
import type { ChatChip } from "@/components/molecules/ChatInputBar";
import type { ChatAssistantItem, ChatFollowUp } from "@/components/molecules/ChatAssistantMessage";
import type { ChatFallbackVariant } from "@/components/molecules/ChatFallbackMessage";

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
  /** When set, renders a ChatFallbackMessage instead of a normal response bubble */
  error?: ChatFallbackVariant;
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
   * replace the loading bubble, or an object with `error` to show a fallback.
   * Returning null/undefined leaves it loading.
   */
  onSend?: (message: string) => Promise<Omit<AssistantEntry, "id" | "role"> | null | undefined>;
  onTopicSelect?: (topic: string) => void;
  /**
   * Called when the user clicks "Descargar conversación".
   * Receives the current message list so the caller can generate a PDF or summary.
   * If omitted, the download button is disabled.
   */
  onDownload?: (messages: ChatEntry[]) => void;
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
  onDownload,
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
            ? { id: loadingId, role: "assistant" as const, ...(reply ?? { error: "no-response" as ChatFallbackVariant }) }
            : m
        )
      );
    }
  }

  // Retry: replace the fallback entry with a loader and resend the preceding user message
  async function retry(entryId: string) {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === entryId);
      const preceding = prev.slice(0, idx).reverse().find((m) => m.role === "user") as UserEntry | undefined;
      if (!preceding) return prev;
      return prev.map((m) =>
        m.id === entryId ? { id: entryId, role: "assistant" as const, isLoading: true } : m
      );
    });

    // Find the preceding user message from current state snapshot
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === entryId);
      const preceding = prev.slice(0, idx).reverse().find((m) => m.role === "user") as UserEntry | undefined;
      if (!preceding || !onSend) return prev;

      // Kick off async reply outside setState
      onSend(preceding.message).then((reply) => {
        setMessages((cur) =>
          cur.map((m) =>
            m.id === entryId
              ? { id: entryId, role: "assistant" as const, ...(reply ?? { error: "no-response" as ChatFallbackVariant }) }
              : m
          )
        );
      });

      return prev;
    });
  }

  const hasMessages = messages.length > 0;

  return (
    // py-9 = 36px top/bottom padding (from design VbxuJ), gap-9 = 36px between panels
    <div className={cn("flex h-full gap-9 py-9 overflow-hidden", className)}>

      {/* ── Sidebar ── */}
      <ChatSidebar
        topics={resolvedTopics}
        methodologyNote={methodologyNote}
        methodologyLink={methodologyLink}
        onMethodologyClick={onMethodologyClick}
      />

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#ffffffe5]">

        {/* Download button — top-right, only when conversation has messages */}
        <AnimatePresence>
          {hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex justify-end px-6 pt-4"
            >
              <Button
                variant="outline"
                color="neutral"
                radius="full"
                iconLeft={Download}
                disabled={!onDownload}
                onClick={() => onDownload?.(messages)}
                className="h-8 gap-1.5 px-4 text-xs font-medium text-[#444748] border-[#c4c7c7] hover:border-[#708b8d] hover:text-[#708b8d] normal-case tracking-normal"
              >
                Descargar conversación
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

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
                {messages.map((entry) => {
                  if (entry.role === "user") {
                    return <ChatUserMessage key={entry.id} message={entry.message} />;
                  }
                  if (entry.error) {
                    return (
                      <ChatFallbackMessage
                        key={entry.id}
                        variant={entry.error}
                        onRetry={onSend ? () => retry(entry.id) : undefined}
                      />
                    );
                  }
                  return (
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
                  );
                })}
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
