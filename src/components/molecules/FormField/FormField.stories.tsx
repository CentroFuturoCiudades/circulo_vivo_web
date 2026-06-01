import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Textarea } from "@/components/atoms/Textarea";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof FormField>;

export const WithInput: Story = {
  render: () => (
    <FormField label="Nombre completo" htmlFor="name" required helperText="Tal como aparece en tu identificación oficial.">
      <Input id="name" placeholder="Dra. Elena Rivas" />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Correo electrónico" htmlFor="email" required errorMessage="Ingresa un correo válido.">
      <Input id="email" state="error" placeholder="correo@ejemplo.com" />
    </FormField>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <FormField label="Indicador" htmlFor="indicator" helperText="Selecciona el indicador a visualizar.">
      <Select
        id="indicator"
        placeholder="Seleccionar..."
        options={[
          { value: "diabetes", label: "Mortalidad Diabetes" },
          { value: "obesity",  label: "Obesidad" },
          { value: "anemia",   label: "Anemia" },
        ]}
      />
    </FormField>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <FormField label="Descripción" htmlFor="desc" helperText="Máximo 500 caracteres.">
      <Textarea id="desc" placeholder="Describe la iniciativa..." rows={4} />
    </FormField>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <FormField helperText="Busca por nombre, estado o categoría.">
      <Input placeholder="Buscar..." />
    </FormField>
  ),
};

export const FullForm: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <FormField label="Nombre" htmlFor="f-name" required>
        <Input id="f-name" placeholder="Tu nombre completo" />
      </FormField>
      <FormField label="Estado" htmlFor="f-state">
        <Select id="f-state" placeholder="Seleccionar estado" options={[
          { value: "cdmx", label: "Ciudad de México" },
          { value: "oax",  label: "Oaxaca" },
          { value: "ver",  label: "Veracruz" },
        ]} />
      </FormField>
      <FormField label="Propuesta" htmlFor="f-proposal" required errorMessage="Este campo es obligatorio.">
        <Textarea id="f-proposal" state="error" rows={3} placeholder="Describe tu propuesta..." />
      </FormField>
    </div>
  ),
};
