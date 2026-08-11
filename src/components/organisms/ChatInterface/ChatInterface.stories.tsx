import type React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChatInterface } from "./ChatInterface";
import type { AssistantEntry, ChatEntry } from "./ChatInterface";

// Background that simulates the page (wheat/field image + white overlay),
// exactly like the design: luminosity image + #ffffff4d overlay + px-9 horizontal padding.
const PAGE_BG: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  padding: "0 36px",
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.30), rgba(255,255,255,0.30)), url('/bg-images/chat-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
};

const meta: Meta<typeof ChatInterface> = {
  title: "Organisms/ChatInterface",
  component: ChatInterface,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={PAGE_BG}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ChatInterface>;

// ── Shared data ───────────────────────────────────────────

const TOPICS = [
  { label: "Barreras" },
  { label: "Estrategias" },
  { label: "Actor" },
];

const SUGGESTIONS = [
  { text: "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos?" },
  { text: "¿Cuáles son las principales barreras que enfrentan?" },
  { text: "¿Qué actores son clave en los sistemas alimentarios?" },
  { text: "¿Cómo se financian estas iniciativas?" },
];

const CONTEXT_CHIPS = [
  { label: "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos?" },
  { label: "¿Principales desafíos sobre las iniciativas para la biodiversidad?" },
];

// Simulated assistant reply — replace with real AI call in production
async function mockOnSend(message: string): Promise<Omit<AssistantEntry, "id" | "role">> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return {
    markdown: `**Respuesta a:** "${message}"\n\nLas iniciativas analizadas identifican tres ejes principales:\n\n1. **Rescate de biodiversidad** — preservación activa de variedades nativas a través de bancos de semillas comunitarios.\n2. **Economía solidaria** — creación de redes de intercambio justo que fortalecen a productores locales.\n3. **Incidencia política** — participación en espacios de formulación de política pública para impulsar marcos normativos favorables.\n\nEstos ejes se entrelazan y se refuerzan mutuamente en la mayoría de los casos documentados.`,
    citation: "Basado en 47 entrevistas semiestructuradas — análisis cualitativo LLM + validación humana.",
    followUps: [
      { text: "¿Qué barreras enfrentan en la incidencia política?" },
      { text: "¿Cómo se financian estas iniciativas?" },
      { text: "Muéstrame ejemplos concretos de rescate de biodiversidad" },
    ],
  };
}

// ── Stories ───────────────────────────────────────────────

export const Welcome: Story = {
  args: {
    topics: TOPICS,
    suggestions: SUGGESTIONS,
    onSend: mockOnSend,
  },
};

export const WithContextChips: Story = {
  args: {
    topics: TOPICS,
    suggestions: SUGGESTIONS,
    contextChips: CONTEXT_CHIPS,
    onSend: mockOnSend,
  },
};

const THREAD: ChatEntry[] = [
  {
    id: "1",
    role: "user",
    message: "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos?",
  },
  {
    id: "2",
    role: "assistant",
    markdown:
      "Las iniciativas analizadas identifican tres ejes principales:\n\n1. **Rescate de biodiversidad** — preservación activa de variedades nativas a través de bancos de semillas comunitarios.\n2. **Economía solidaria** — creación de redes de intercambio justo que fortalecen a productores locales.\n3. **Incidencia política** — participación en espacios de formulación de política pública para impulsar marcos normativos favorables.",
    citation:
      "Basado en 47 entrevistas semiestructuradas — análisis cualitativo LLM + validación humana.",
    followUps: [
      { text: "¿Qué barreras enfrentan en la incidencia política?" },
      { text: "¿Cómo se financian estas iniciativas?" },
      { text: "Muéstrame ejemplos de rescate de biodiversidad" },
    ],
  },
  {
    id: "3",
    role: "user",
    message: "¿Qué barreras enfrentan en la incidencia política?",
  },
  {
    id: "4",
    role: "assistant",
    isLoading: true,
  },
];

export const WithConversation: Story = {
  args: {
    topics: [
      { label: "Barreras", active: true },
      { label: "Estrategias" },
      { label: "Actor" },
    ],
    initialMessages: THREAD,
    contextChips: CONTEXT_CHIPS,
    onSend: mockOnSend,
  },
};

// ── Fallback stories ──────────────────────────────────────

const USER_Q: ChatEntry = {
  id: "u1",
  role: "user",
  message: "¿Qué estrategias implementan las iniciativas para alcanzar sus objetivos?",
};

const PREV_ANSWER: ChatEntry = {
  id: "a0",
  role: "assistant",
  markdown:
    "Las iniciativas analizadas identifican tres ejes principales: rescate de biodiversidad, economía solidaria e incidencia política.",
  citation: "Basado en 47 entrevistas semiestructuradas.",
};

const USER_Q2: ChatEntry = {
  id: "u2",
  role: "user",
  message: "¿Cómo se financian estas iniciativas?",
};

/** El asistente no generó ninguna respuesta */
export const FallbackNoResponse: Story = {
  name: "Fallback — Sin respuesta",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f1", role: "assistant", error: "no-response" }],
    onSend: mockOnSend,
  },
};

/** La solicitud tardó demasiado */
export const FallbackTimeout: Story = {
  name: "Fallback — Tiempo de espera agotado",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f2", role: "assistant", error: "timeout" }],
    onSend: mockOnSend,
  },
};

/** Error interno del servidor */
export const FallbackApiError: Story = {
  name: "Fallback — Error del servidor (5xx)",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f3", role: "assistant", error: "api-error" }],
    onSend: mockOnSend,
  },
};

/** Sin conexión a internet */
export const FallbackNetworkError: Story = {
  name: "Fallback — Sin conexión",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f4", role: "assistant", error: "network-error" }],
    onSend: mockOnSend,
  },
};

/** Demasiadas solicitudes — sin botón de reintentar */
export const FallbackRateLimit: Story = {
  name: "Fallback — Límite de solicitudes (429)",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f5", role: "assistant", error: "rate-limit" }],
    onSend: mockOnSend,
  },
};

/** Respuesta moderada por filtros de seguridad */
export const FallbackContentFiltered: Story = {
  name: "Fallback — Contenido filtrado",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f6", role: "assistant", error: "content-filtered" }],
    onSend: mockOnSend,
  },
};

/** Stream cortado antes de completarse */
export const FallbackStreamInterrupted: Story = {
  name: "Fallback — Respuesta interrumpida",
  args: {
    topics: TOPICS,
    initialMessages: [USER_Q, PREV_ANSWER, USER_Q2, { id: "f7", role: "assistant", error: "stream-interrupted" }],
    onSend: mockOnSend,
  },
};

/** Todos los fallbacks en una sola conversación */
export const AllFallbacks: Story = {
  name: "Fallback — Todos los tipos",
  args: {
    topics: TOPICS,
    onSend: mockOnSend,
    initialMessages: [
      USER_Q,
      PREV_ANSWER,
      { id: "u-a", role: "user", message: "Pregunta que genera error de timeout" },
      { id: "f-a", role: "assistant", error: "timeout" },
      { id: "u-b", role: "user", message: "Pregunta sin respuesta del servidor" },
      { id: "f-b", role: "assistant", error: "api-error" },
      { id: "u-c", role: "user", message: "Pregunta sin conexión a internet" },
      { id: "f-c", role: "assistant", error: "network-error" },
      { id: "u-d", role: "user", message: "Demasiadas solicitudes en poco tiempo" },
      { id: "f-d", role: "assistant", error: "rate-limit" },
      { id: "u-e", role: "user", message: "Consulta filtrada por moderación" },
      { id: "f-e", role: "assistant", error: "content-filtered" },
      { id: "u-f", role: "user", message: "Stream que se cortó a mitad" },
      { id: "f-f", role: "assistant", error: "stream-interrupted" },
    ],
  },
};
