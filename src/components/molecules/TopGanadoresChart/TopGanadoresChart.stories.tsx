import type { Meta, StoryObj } from "@storybook/react";
import { TopGanadoresChart } from "./TopGanadoresChart";

const meta: Meta<typeof TopGanadoresChart> = {
  title: "Molecules/TopGanadoresChart",
  component: TopGanadoresChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[560px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof TopGanadoresChart>;

export const Default: Story = {};
