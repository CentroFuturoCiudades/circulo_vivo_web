import type { Meta, StoryObj } from "@storybook/react";
import { ChatAssistantMessage } from "./ChatAssistantMessage";

const meta: Meta<typeof ChatAssistantMessage> = {
  title: "Molecules/ChatAssistantMessage",
  component: ChatAssistantMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-[780px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ChatAssistantMessage>;

export const Default: Story = {
  args: {
    intro:
      "De acuerdo con las entrevistas y registros de campo, las iniciativas en la red identifican tres ejes críticos de obstáculos:",
    items: [
      {
        number: "01",
        title: "Mercados y Ferias Itinerantes",
        description:
          "8 de 12 iniciativas priorizan la venta directa para evitar intermediarios (ej. Varias Iniciativas).",
      },
      {
        number: "02",
        title: "Redes de Confianza (Boca a boca)",
        description:
          "Sistemas de recomendación local que sustituyen la inversión en marketing digital tradicional.",
      },
      {
        number: "03",
        title: "Uso de plataformas comunitarias",
        description:
          "Grupos de mensajería para preventa coordinada, reduciendo desperdicios en un ciclo más corto.",
      },
    ],
    citation: "Basado en análisis de 12 iniciativas de la red Círculo Vivo.",
    followUps: [
      { text: "¿Cómo han resuelto el financiamiento?" },
      {
        text: "Ver iniciativas de cooperativas que promueven medios de vida sostenibles en el sistema alimentario.",
      },
      { text: "Contactar a Del Comalli" },
    ],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
