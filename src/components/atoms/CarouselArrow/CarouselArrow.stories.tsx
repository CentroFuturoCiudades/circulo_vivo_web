import type { Meta, StoryObj } from "@storybook/react";
import { CarouselArrow } from "./CarouselArrow";

const meta: Meta<typeof CarouselArrow> = {
  title: "Atoms/CarouselArrow",
  component: CarouselArrow,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CarouselArrow>;

export const Prev: Story = { args: { direction: "prev" } };
export const Next: Story = { args: { direction: "next" } };
export const ActiveNext: Story = { args: { direction: "next", active: true } };
export const DisabledPrev: Story = { args: { direction: "prev", disabled: true } };

export const Pair: Story = {
  render: () => (
    <div className="flex gap-2">
      <CarouselArrow direction="prev" disabled />
      <CarouselArrow direction="next" active />
    </div>
  ),
};
