"use client";

import { NavBar } from "@/components/molecules/NavBar";
import { ChatInterface } from "@/components/organisms/ChatInterface";
import type { ChatTopic } from "@/components/organisms/ChatSidebar";
import type { ChatSuggestion } from "@/components/molecules/ChatWelcomePrompt";
import type { ChatChip } from "@/components/molecules/ChatInputBar";
import type { AssistantEntry } from "@/components/organisms/ChatInterface";

const NAV_LINKS = [
  { label: "Inicio",      href: "/" },
  { label: "Equipo",      href: "/equipo" },
  { label: "Mapa",        href: "/mapa" },
  { label: "Chatbot",     href: "/chatbot", active: true },
];

const TOPICS: ChatTopic[] = [
  { label: "Barreras" },
  { label: "Estrategias" },
  { label: "Actor" },
];

const SUGGESTIONS: ChatSuggestion[] = [
  { text: "¿Qué quisieras descubrir sobre las iniciativas?" },
  { text: "¿Qué estrategias implementan  las iniciativas para alcanzar sus objetivos?" },
  { text: "Principales desafíos de las iniciativas que trabajan con huertos escolares en la biodiversidad" },
];

const CONTEXT_CHIPS: ChatChip[] = [
  { label: "Barreras Logísticas" },
  { label: "Costo de Insumos" },
  { label: "Apoyo Institucional" },
  { label: "Financiamiento" },
];

async function handleSend(message: string): Promise<Omit<AssistantEntry, "id" | "role">> {
  // TODO: wire up to the real research-AI backend.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    markdown: `Aún no tengo una respuesta conectada para: "${message}". Esta es una respuesta de ejemplo mientras se integra el backend.`,
  };
}

export default function ChatbotPage() {
  return (
    <main
      className="h-screen w-full overflow-hidden px-4 md:px-9"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.30), rgba(255,255,255,0.30)), url('/bg-images/chat-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 inset-x-0 z-50 px-6 md:px-9 pt-5">
        <NavBar
          links={NAV_LINKS}
          bgColor="#708b8d"
          bgOpacity={80}
          logoColor="#ffffff"
          pillBgColor="#ffffff"
          pillBgOpacity={50}
          activeLinkColor="#708b8d"
          activeLinkOpacity={100}
          activeLinkTextColor="#ffffff"
        />
      </div>

      <div className="h-full pt-[100px]">
        <ChatInterface
          topics={TOPICS}
          suggestions={SUGGESTIONS}
          contextChips={CONTEXT_CHIPS}
          onSend={handleSend}
        />
      </div>
    </main>
  );
}
