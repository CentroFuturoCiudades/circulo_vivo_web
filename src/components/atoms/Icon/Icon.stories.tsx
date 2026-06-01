import type { Meta, StoryObj } from "@storybook/react";
import { MapPin, MessageCircle, BarChart2, Leaf, Zap, Users, Info } from "lucide-react";
import { IconContainer } from "./Icon";

const meta: Meta<typeof IconContainer> = {
  title: "Atoms/IconContainer",
  component: IconContainer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof IconContainer>;

export const Teal: Story = { args: { color: "teal", icon: MapPin } };
export const Crimson: Story = { args: { color: "crimson", icon: MessageCircle } };
export const Secondary: Story = { args: { color: "secondary", icon: BarChart2 } };
export const Gold: Story = { args: { color: "gold", icon: Leaf } };
export const Solid: Story = { args: { color: "solid", icon: Zap } };
export const Small: Story = { args: { color: "teal", size: "sm", icon: Info } };
export const Large: Story = { args: { color: "crimson", size: "lg", icon: MapPin } };

export const AllColors: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <IconContainer color="crimson" icon={MapPin} />
      <IconContainer color="teal" icon={MessageCircle} />
      <IconContainer color="secondary" icon={BarChart2} />
      <IconContainer color="gold" icon={Leaf} />
      <IconContainer color="solid" icon={Zap} />
      <IconContainer color="neutral" icon={Info} />
      <IconContainer color="crimson" size="sm" icon={Users} />
    </div>
  ),
};
