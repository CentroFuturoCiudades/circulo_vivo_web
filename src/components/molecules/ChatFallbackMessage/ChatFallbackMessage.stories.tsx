import type { Meta, StoryObj } from "@storybook/react";
import { ChatFallbackMessage } from "./ChatFallbackMessage";

const meta: Meta<typeof ChatFallbackMessage> = {
  title: "Molecules/ChatFallbackMessage",
  component: ChatFallbackMessage,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div className="max-w-[780px]"><Story /></div>],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "no-response",
        "timeout",
        "api-error",
        "network-error",
        "rate-limit",
        "content-filtered",
        "stream-interrupted",
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChatFallbackMessage>;

const noop = () => {};

// ── Individual variants ───────────────────────────────────

/** El asistente no generó ningún contenido — pregunta ambigua o muy corta */
export const NoResponse: Story = {
  name: "Sin respuesta",
  args: { variant: "no-response", onRetry: noop },
};

/** La solicitud tardó demasiado — alta demanda o consulta muy larga */
export const Timeout: Story = {
  name: "Tiempo de espera agotado",
  args: { variant: "timeout", onRetry: noop },
};

/** Error 5xx del servidor — problema interno */
export const ApiError: Story = {
  name: "Error del servidor (5xx)",
  args: { variant: "api-error", onRetry: noop },
};

/** El usuario perdió la conexión a internet */
export const NetworkError: Story = {
  name: "Sin conexión a internet",
  args: { variant: "network-error", onRetry: noop },
};

/** 429 — demasiadas solicitudes en poco tiempo, sin botón de retry */
export const RateLimit: Story = {
  name: "Límite de solicitudes (429)",
  args: { variant: "rate-limit" },
};

/** Respuesta bloqueada por filtros de seguridad, sin retry */
export const ContentFiltered: Story = {
  name: "Contenido filtrado / moderado",
  args: { variant: "content-filtered" },
};

/** El streaming se cortó antes de completar la respuesta */
export const StreamInterrupted: Story = {
  name: "Respuesta interrumpida (stream)",
  args: { variant: "stream-interrupted", onRetry: noop },
};

// ── Without retry button ──────────────────────────────────

/** Variante con onRetry omitido — el botón Reintentar no aparece aunque el tipo lo permita */
export const NoRetryButton: Story = {
  name: "Sin botón Reintentar",
  args: { variant: "api-error" },
};

// ── All variants at once ──────────────────────────────────

export const AllVariants: Story = {
  name: "Todos los fallbacks",
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => (
    <div className="p-8 flex flex-col gap-4 max-w-[780px] mx-auto">
      <Story />
    </div>
  )],
  render: () => (
    <>
      <ChatFallbackMessage variant="no-response"        onRetry={noop} />
      <ChatFallbackMessage variant="timeout"            onRetry={noop} />
      <ChatFallbackMessage variant="api-error"          onRetry={noop} />
      <ChatFallbackMessage variant="network-error"      onRetry={noop} />
      <ChatFallbackMessage variant="rate-limit" />
      <ChatFallbackMessage variant="content-filtered" />
      <ChatFallbackMessage variant="stream-interrupted" onRetry={noop} />
    </>
  ),
};
