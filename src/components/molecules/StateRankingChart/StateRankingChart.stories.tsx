import type { Meta, StoryObj } from "@storybook/react";
import { StateRankingChart, type StateRankingItem } from "./StateRankingChart";

const STATES = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima",
  "Chiapas", "Chihuahua", "Ciudad de México", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

const ITEMS: StateRankingItem[] = STATES.map((state) => ({ state, value: Math.round(20 + Math.random() * 70) }));

const meta: Meta<typeof StateRankingChart> = {
  title: "Molecules/StateRankingChart",
  component: StateRankingChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[560px] bg-white p-6 rounded-2xl border border-[#d1c6cf]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof StateRankingChart>;

export const Default: Story = { args: { items: ITEMS, nationalAverage: 52.8 } };
