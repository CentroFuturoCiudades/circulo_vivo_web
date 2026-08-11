import type { Meta, StoryObj } from "@storybook/react";
import { TeamMemberCard } from "./TeamMemberCard";

const meta: Meta<typeof TeamMemberCard> = {
  title: "Molecules/TeamMemberCard",
  component: TeamMemberCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TeamMemberCard>;

export const Directivo: Story = {
  decorators: [(Story) => <div className="w-[404px]"><Story /></div>],
  args: {
    variant: "directivo",
    name: "Dra. Ana Lilia Reyes",
    role: "Directora General",
    description: "Investigadora en sistemas alimentarios con más de 15 años de experiencia en políticas públicas y desarrollo territorial.",
  },
};

export const DirectivoGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 border border-[#f4f4f5] divide-x divide-[#f4f4f5] bg-[#bcb884]">
      {[
        { name: "Dra. Ana Lilia Reyes",    role: "Directora General",    description: "Investigadora en sistemas alimentarios con 15 años de experiencia." },
        { name: "Dr. Jorge Mendieta",       role: "Director de Datos",    description: "Especialista en ciencia de datos aplicada a territorios rurales." },
        { name: "Mtra. Sofía Castellanos",  role: "Directora de Alianzas", description: "Gestora de alianzas estratégicas con instituciones nacionales e internacionales." },
      ].map((m) => (
        <TeamMemberCard key={m.name} variant="directivo" {...m} />
      ))}
    </div>
  ),
};

export const Tecnico: Story = {
  decorators: [(Story) => <div className="w-[148px]"><Story /></div>],
  args: {
    variant: "tecnico",
    name: "Lucía Méndez",
    role: "Antropóloga Social",
    tag: "Social",
  },
};

export const TecnicoGrid: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        { name: "Lucía Méndez",       role: "Antropóloga Social",      tag: "Social" },
        { name: "Carlos Vázquez",     role: "Desarrollador Full Stack", tag: "Técnico" },
        { name: "Fernanda Ruiz",      role: "Investigadora Territorial",tag: "Academia" },
        { name: "Miguel Ortiz",       role: "Analista de Datos",        tag: "Técnico" },
        { name: "Sofía Castellanos",  role: "Gestora de Alianzas",      tag: "Social" },
        { name: "Pablo Herrera",      role: "DevOps",                   tag: "Técnico" },
      ].map((m) => (
        <div key={m.name} className="w-[148px]">
          <TeamMemberCard variant="tecnico" {...m} />
        </div>
      ))}
    </div>
  ),
};
