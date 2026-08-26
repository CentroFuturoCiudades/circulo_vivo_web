import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DomainPill } from "./DomainPill";

const meta: Meta<typeof DomainPill> = {
  title: "Molecules/DomainPill",
  component: DomainPill,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DomainPill>;

export const Row: Story = {
  render: () => {
    const domains = [
      { label: "Impulsores", value: 42.5 },
      { label: "Cadena de suministro", value: 55.9 },
      { label: "Entorno alimentario", value: 41.3 },
      { label: "Comportamiento del consumidor", value: 40.4 },
      { label: "Resultados", value: 60.4 },
    ];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState("Impulsores");
    return (
      <div className="flex gap-4 flex-wrap w-[900px]">
        {domains.map((d) => (
          <DomainPill
            key={d.label}
            label={d.label}
            value={d.value}
            active={d.label === active}
            onSelect={() => setActive(d.label)}
            onInfo={() => alert(`Info: ${d.label}`)}
          />
        ))}
      </div>
    );
  },
};

export const Single: Story = { args: { label: "Resultados", value: 60.4, active: true } };
