import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { Input, ChatInput } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "Escribe aquí..." } };
export const Focus: Story = { args: { placeholder: "Sistema alimentario", autoFocus: true } };
export const Error: Story = { args: { state: "error", placeholder: "Campo requerido", errorMessage: "Este campo es obligatorio" } };
export const Success: Story = { args: { state: "success", value: "dato válido", readOnly: true } };
export const Disabled: Story = { args: { disabled: true, placeholder: "No disponible" } };
export const WithSearchIcon: Story = { args: { iconLeft: Search, placeholder: "Buscar iniciativas..." } };
export const Small: Story = { args: { size: "sm", placeholder: "Filtrar..." } };
export const Large: Story = { args: { size: "lg", placeholder: "Busca cualquier tema..." } };

export const Chat: StoryObj<typeof ChatInput> = {
  render: () => (
    <div className="w-[480px]">
      <ChatInput placeholder="Escribe tu pregunta aquí..." />
    </div>
  ),
};
