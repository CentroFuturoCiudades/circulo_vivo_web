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
    "linear-gradient(rgba(255,255,255,0.30), rgba(255,255,255,0.30)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600')",
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
