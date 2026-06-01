import type { Meta, StoryObj } from "@storybook/react";
import { Map, BarChart2, MessageCircle, Users, Settings } from "lucide-react";
import { NavItem } from "./NavItem";

const meta: Meta<typeof NavItem> = {
  title: "Molecules/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-56"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = { args: { label: "Mapa", icon: Map } };
export const Active: Story = { args: { label: "Indicadores", icon: BarChart2, active: true } };
export const WithBadge: Story = { args: { label: "Chatbot", icon: MessageCircle, badge: 3 } };
export const ActiveWithBadge: Story = { args: { label: "Chatbot", icon: MessageCircle, active: true, badge: 5 } };
export const NoIcon: Story = { args: { label: "Configuración" } };

export const SideNav: Story = {
  render: () => (
    <div className="flex flex-col gap-1 p-3 w-56 bg-white border border-neutral-100 rounded-xl">
      <NavItem label="Mapa"         icon={Map}           />
      <NavItem label="Indicadores"  icon={BarChart2}     active />
      <NavItem label="Chatbot"      icon={MessageCircle} badge={3} />
      <NavItem label="Equipo"       icon={Users}         />
      <NavItem label="Configuración" icon={Settings}     />
    </div>
  ),
};

export const CollapsedNav: Story = {
  decorators: [(Story) => <div className="w-14"><Story /></div>],
  render: () => (
    <div className="flex flex-col gap-1 p-2 w-14 bg-white border border-neutral-100 rounded-xl">
      <NavItem label="Mapa"         icon={Map}           collapsed />
      <NavItem label="Indicadores"  icon={BarChart2}     collapsed active />
      <NavItem label="Chatbot"      icon={MessageCircle} collapsed />
      <NavItem label="Equipo"       icon={Users}         collapsed />
    </div>
  ),
};
