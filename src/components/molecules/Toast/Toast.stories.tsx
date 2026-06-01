import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "./Toast";
import { Button } from "@/components/atoms/Button";

const meta: Meta = {
  title: "Molecules/Toast",
  parameters: { layout: "centered" },
  decorators: [(Story) => <><Story /><Toaster /></>],
};
export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" color="teal" onClick={() => toast.success("Iniciativa guardada", { description: "Los cambios se aplicaron correctamente." })}>
        Éxito
      </Button>
      <Button variant="primary" color="crimson" onClick={() => toast.error("Error al guardar", { description: "Verifica tu conexión e intenta de nuevo." })}>
        Error
      </Button>
      <Button variant="primary" color="gold" onClick={() => toast.warning("Datos incompletos", { description: "Algunos campos son opcionales pero recomendados." })}>
        Advertencia
      </Button>
      <Button variant="primary" color="navy" onClick={() => toast.info("Actualización disponible", { description: "Los datos se actualizarán al recargar la página." })}>
        Info
      </Button>
      <Button variant="secondary" onClick={() => toast("Operación completada")}>
        Simple
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="primary"
      onClick={() =>
        toast.error("Iniciativa eliminada", {
          description: "Esta acción no se puede deshacer.",
          action: { label: "Deshacer", onClick: () => toast.success("Acción deshecha") },
          cancel: { label: "Cerrar", onClick: () => {} },
        })
      }
    >
      Eliminar (con acción)
    </Button>
  ),
};
