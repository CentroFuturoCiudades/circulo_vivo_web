import type { Meta, StoryObj } from "@storybook/react";
import { ChatMarkdownContent } from "./ChatMarkdownContent";

const meta: Meta<typeof ChatMarkdownContent> = {
  title: "Molecules/ChatMarkdownContent",
  component: ChatMarkdownContent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-[620px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof ChatMarkdownContent>;

export const Default: Story = {
  args: {
    content: `De acuerdo con los testimonios analizados, las iniciativas identifican **tres ejes críticos**:

1. **Acceso a Mercados**: Cosechando Soberanía menciona la logística de transporte como una barrera física para llegar a centros urbanos sin intermediarios.

2. **Redes de Confianza (Boca a boca)**: Sistemas de recomendación local que sustituyen la inversión en marketing digital tradicional.

3. **Uso de plataformas comunitarias**: Grupos de mensajería para preventa coordinada, reduciendo desperdicios en un ciclo más corto.

> Chiapas y Guerrero muestran la mayor pendiente de crecimiento potencial.`,
  },
};

export const WithHeadings: Story = {
  args: {
    content: `## Estrategias de comercialización

Las iniciativas emplean distintos canales según su escala:

### Mercados locales
Ferias itinerantes y tianguis comunitarios con presencia semanal.

### Digital
- Grupos de WhatsApp para pedidos anticipados
- Instagram para visibilidad regional

### Código de ejemplo
\`\`\`
precio_base = costo_produccion * 1.3
\`\`\`

Para más información, consulta [la metodología completa](#).`,
  },
};

export const WithTable: Story = {
  args: {
    content: `## Comparativa de iniciativas

| Iniciativa | Estado | Resiliencia | Estrategia |
|---|---|---|---|
| Del Comalli | CDMX | 0.82 | Mercados directos |
| microTERRA | CDMX | 0.71 | Huertos urbanos |
| Semillas de Vida | Oaxaca | 0.45 | Banco de semillas |
| Cosechando Soberanía | Chiapas | 0.38 | Cooperativa |`,
  },
};
