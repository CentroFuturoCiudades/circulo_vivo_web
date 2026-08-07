import type { Meta, StoryObj } from "@storybook/react";
import { IndicatorCompareList, type IndicatorCompareItem } from "./IndicatorCompareList";

const ITEMS: IndicatorCompareItem[] = [
  {
    name: "Diabetes en adultos (%)",
    description: "Prevalencia de diabetes en la población adulta.",
    unit: "%",
    source: "ENSANUT",
    subtopic: "Salud",
    statePercent: 62, nationalPercent: 48,
    stateTitle: "Ciudad de México: 10.7%", nationalTitle: "Nacional: 9.1%",
  },
  {
    name: "Obesidad en adultos (%)",
    description: "Prevalencia de obesidad en la población adulta.",
    unit: "%",
    source: "ENSANUT",
    subtopic: "Salud",
    statePercent: 40, nationalPercent: 55,
    stateTitle: "Ciudad de México: 33.1%", nationalTitle: "Nacional: 36.9%",
  },
  {
    name: "Población en pobreza (%)",
    description: "Porcentaje de población en situación de pobreza.",
    unit: "%",
    source: "CONEVAL",
    subtopic: "Equidad",
    nationalFallback: true,
    statePercent: 20, nationalPercent: 50,
    stateTitle: "Ciudad de México: 17.1%", nationalTitle: "Nacional: 29.5%",
  },
];

const meta: Meta<typeof IndicatorCompareList> = {
  title: "Molecules/IndicatorCompareList",
  component: IndicatorCompareList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[480px] bg-white p-6 rounded-2xl border border-[#d1c6cf]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof IndicatorCompareList>;

export const Default: Story = { args: { stateName: "Ciudad de México", items: ITEMS } };

export const Plain: Story = {
  args: {
    stateName: "Ciudad de México",
    showLegend: false,
    items: [
      {
        name: "Tasa de dependencia demográfica (%)",
        description: "Compara la población infantil y adulta mayor con la población en edad de trabajar.",
        plain: true,
        stateValueLabel: "0.51",
        nationalValueLabel: "0.50",
      },
      {
        name: "Escolaridad promedio (grado)",
        description: "Años de estudio promedio de la población del estado.",
        plain: true,
        stateValueLabel: "10.35 grado",
        nationalValueLabel: "9.74 grado",
      },
    ],
  },
};
