import type { Meta, StoryObj } from "@storybook/react";
import { DispersionChart } from "./DispersionChart";

const meta: Meta<typeof DispersionChart> = {
  title: "Molecules/DispersionChart",
  component: DispersionChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DispersionChart>;

export const Default: Story = {};
