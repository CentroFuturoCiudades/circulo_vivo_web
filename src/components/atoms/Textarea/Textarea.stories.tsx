import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: "Escribe tu mensaje...", rows: 4 } };
export const Error: Story = { args: { state: "error", placeholder: "Campo requerido", rows: 4, errorMessage: "Este campo es obligatorio" } };
export const Success: Story = { args: { state: "success", value: "Texto válido ingresado.", rows: 4, readOnly: true } };
export const Disabled: Story = { args: { disabled: true, placeholder: "No disponible", rows: 4 } };
export const Resizable: Story = { args: { resize: true, placeholder: "Puedes redimensionar...", rows: 3 } };
