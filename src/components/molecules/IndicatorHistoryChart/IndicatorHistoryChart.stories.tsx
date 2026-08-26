import type { Meta, StoryObj } from "@storybook/react";
import { IndicatorHistoryChart } from "./IndicatorHistoryChart";

const meta: Meta<typeof IndicatorHistoryChart> = {
  title: "Molecules/IndicatorHistoryChart",
  component: IndicatorHistoryChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[420px] bg-white p-6 rounded-2xl border border-[#d1c6cf]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof IndicatorHistoryChart>;

export const Available: Story = {
  args: {
    oldYear: 2015, oldValue: 9.73, year: 2020, value: 10.35,
    sourceLine: "Fuente: INEGI · Ciudad de México aumentó 6.4%, frente al cambio a nivel nacional (aumentó 15.2%) en el mismo periodo.",
  },
};

export const Unavailable: Story = {
  args: {},
};
