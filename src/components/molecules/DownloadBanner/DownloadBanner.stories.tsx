import type { Meta, StoryObj } from "@storybook/react";
import { DownloadBanner } from "./DownloadBanner";
// Vite resolves static asset imports as URL strings at runtime
import mapDownload from "@/assets/component-images/map-download.png";

const meta: Meta<typeof DownloadBanner> = {
  title: "Molecules/DownloadBanner",
  component: DownloadBanner,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "surface" } },
  decorators: [(Story) => <div className="max-w-[900px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof DownloadBanner>;

export const WithImage: Story = {
  args: {
    title: "Descarga la Infografía",
    description:
      "Obtén el reporte completo de resiliencia en salud de México. Incluye indicadores nacionales, rankings por estado, análisis de dispersión y mapas geográficos detallados.",
    ctaLabel: "Descargar",
    imageUrl: mapDownload as unknown as string,
    imageAlt: "Mapa de México",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "Descarga la Infografía",
    description:
      "Obtén el reporte completo de resiliencia en salud de México. Incluye indicadores nacionales, rankings por estado, análisis de dispersión y mapas geográficos detallados.",
    ctaLabel: "Descargar",
  },
};

export const CustomCopy: Story = {
  args: {
    title: "Descarga el Reporte Anual",
    description:
      "Análisis completo de los indicadores de sistemas alimentarios sostenibles 2024. Datos de 32 estados con visualizaciones interactivas.",
    ctaLabel: "Descargar PDF",
    imageUrl: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=400&h=260&fit=crop",
    imageAlt: "Reporte anual",
  },
};
