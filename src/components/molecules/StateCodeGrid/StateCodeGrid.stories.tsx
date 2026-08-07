import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { StateCodeGrid, type StateCodeGridItem } from "./StateCodeGrid";

const STATES = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima",
  "Chiapas", "Chihuahua", "Ciudad de México", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

const ITEMS: StateCodeGridItem[] = STATES.map((state, i) => ({
  state,
  code: String(i + 1).padStart(2, "0"),
  value: Math.round(20 + Math.random() * 70),
}));

const meta: Meta<typeof StateCodeGrid> = {
  title: "Molecules/StateCodeGrid",
  component: StateCodeGrid,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof StateCodeGrid>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState("Ciudad de México");
    return <StateCodeGrid items={ITEMS} selectedState={selected} onSelect={setSelected} />;
  },
};
