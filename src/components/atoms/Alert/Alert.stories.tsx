import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", title: "Datos actualizados", children: "La información refleja el último corte disponible: Q4 2024." },
};
export const Success: Story = {
  args: { variant: "success", title: "Iniciativa registrada", children: "El formulario se envió correctamente y será revisado en 48 h." },
};
export const Warning: Story = {
  args: { variant: "warning", title: "Datos incompletos", children: "Algunos estados no cuentan con información para este indicador." },
};
export const Error: Story = {
  args: { variant: "error", title: "Error al cargar", children: "No fue posible obtener los datos del mapa. Intenta de nuevo." },
};
export const NoTitle: Story = {
  args: { variant: "info", children: "Selecciona un estado en el mapa para ver el detalle." },
};
export const Dismissible: Story = {
  args: { variant: "warning", title: "Conexión lenta", children: "La carga del mapa puede tardar más de lo habitual.", onClose: () => {} },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert variant="info"    title="Información">Datos del período 2020–2024.</Alert>
      <Alert variant="success" title="Guardado">Cambios aplicados correctamente.</Alert>
      <Alert variant="warning" title="Advertencia">Cobertura parcial en 3 estados.</Alert>
      <Alert variant="error"   title="Error">No se pudo conectar al servidor.</Alert>
    </div>
  ),
};
