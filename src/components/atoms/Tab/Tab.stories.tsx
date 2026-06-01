import type { Meta, StoryObj } from "@storybook/react";
import { HeartPulse, Leaf, BarChart2, Globe, Building2 } from "lucide-react";
import { Tab } from "./Tab";

const meta: Meta<typeof Tab> = {
  title: "Atoms/Tab",
  component: Tab,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Active: Story = { args: { active: true, icon: HeartPulse, children: "SALUD" } };
export const Default: Story = { args: { active: false, children: "ECONOMÍA" } };
export const Hover: Story = { args: { active: false, children: "AMBIENTE" } };
export const Disabled: Story = { args: { disabled: true, children: "GOBERNANZA" } };

export const TabBar: Story = {
  render: () => (
    <div className="flex border-b border-neutral-100">
      <Tab active icon={HeartPulse}>SALUD</Tab>
      <Tab icon={BarChart2}>ACCESO FÍSICO</Tab>
      <Tab icon={Building2}>ECONOMÍA</Tab>
      <Tab icon={Leaf}>AMBIENTE</Tab>
      <Tab icon={Globe}>GOBERNANZA</Tab>
    </div>
  ),
};
