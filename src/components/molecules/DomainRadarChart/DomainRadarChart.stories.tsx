import type { Meta, StoryObj } from "@storybook/react";
import { DomainRadarChart } from "./DomainRadarChart";

const meta: Meta<typeof DomainRadarChart> = {
  title: "Molecules/DomainRadarChart",
  component: DomainRadarChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[420px] bg-white p-6 rounded-2xl border border-[#d1c6cf]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DomainRadarChart>;

export const Default: Story = {
  args: {
    stateName: "Ciudad de México",
    points: [
      { domain: "Cadena de suministro", stateValue: 39.2, nationalValue: 55.6 },
      { domain: "Entorno alimentario", stateValue: 48.0, nationalValue: 47.8 },
      { domain: "Comportamiento del consumidor", stateValue: 68.1, nationalValue: 45.6 },
      { domain: "Resultados", stateValue: 56.7, nationalValue: 65.7 },
    ],
  },
};
