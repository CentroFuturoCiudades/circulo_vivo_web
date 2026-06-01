import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { variant: "text", width: 200 } };
export const Circular: Story = { args: { variant: "circular", width: 40, height: 40 } };
export const Rectangular: Story = { args: { variant: "rectangular", width: 300, height: 120 } };

export const KPICardSkeleton: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6 rounded-xl border border-neutral-100 w-64">
      <Skeleton variant="text" width={120} />
      <Skeleton variant="text" width={80} height={32} />
      <Skeleton variant="text" width="100%" />
    </div>
  ),
};

export const TeamCardSkeleton: Story = {
  render: () => (
    <div className="flex gap-3 items-center p-4 w-72">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
};
