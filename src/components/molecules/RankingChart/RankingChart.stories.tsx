import type { Meta, StoryObj } from "@storybook/react";
import { RankingChart } from "./RankingChart";

const meta: Meta<typeof RankingChart> = {
  title: "Molecules/RankingChart",
  component: RankingChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof RankingChart>;

export const Default: Story = {};
