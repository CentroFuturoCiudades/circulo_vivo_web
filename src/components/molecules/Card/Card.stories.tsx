import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    padding: { control: "select", options: ["none","sm","md","lg"] },
    radius:  { control: "select", options: ["sm","md","lg"] },
    shadow:  { control: "select", options: ["none","sm","md","lg"] },
    accent:  { control: "select", options: ["none","teal","crimson","navy","gold"] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader title="Resumen de indicadores" subtitle="Actualizado Q4 2024" />
      <CardBody>
        <p className="font-sans text-[13px] text-neutral-600">
          Análisis sistémico de los indicadores de salud y equidad alimentaria en las regiones seleccionadas.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="link" color="teal" size="sm">VER DETALLE</Button>
        <Badge variant="success">ACTIVO</Badge>
      </CardFooter>
    </Card>
  ),
};

export const WithAccent: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card accent="teal">
        <CardHeader title="Promedio Nacional" subtitle="IISE 2024" />
        <CardBody><p className="font-display font-bold text-4xl text-primary">0.542</p></CardBody>
      </Card>
      <Card accent="navy">
        <CardHeader title="Estados Resilientes" subtitle="De un total de 32" />
        <CardBody><p className="font-display font-bold text-4xl text-secondary">08</p></CardBody>
      </Card>
      <Card accent="gold">
        <CardHeader title="Impacto Programático" subtitle="Cobertura" />
        <CardBody><p className="font-display font-bold text-4xl text-neutral-900">84%</p></CardBody>
      </Card>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card>
      <CardHeader
        title="Huertos Urbanos CDMX"
        subtitle="Ciudad de México · 2022"
        action={<Badge variant="success">ACTIVO</Badge>}
      />
      <CardBody>
        <p className="font-sans text-[13px] text-neutral-600">
          Red de huertos comunitarios en colonias de alta densidad.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="primary" size="sm" color="crimson" radius="none">VER MÁS</Button>
      </CardFooter>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card shadow="none" bordered>
      <CardHeader title="Sin sombra" subtitle="Solo borde" />
      <CardBody><p className="text-[13px] text-neutral-500">Útil para listas de tarjetas dentro de una tabla o panel.</p></CardBody>
    </Card>
  ),
};
