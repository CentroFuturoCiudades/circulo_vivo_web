import type { Meta, StoryObj } from "@storybook/react";
import { GananciaScatterChart } from "./GananciaScatterChart";

const meta: Meta<typeof GananciaScatterChart> = {
  title: "Molecules/GananciaScatterChart",
  component: GananciaScatterChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof GananciaScatterChart>;

export const Default: Story = {};
