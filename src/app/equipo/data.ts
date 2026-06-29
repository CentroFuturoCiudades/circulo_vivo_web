import type { Directivo } from "@/components/organisms/DirectivosSection";
import type { MiembroTecnico } from "@/components/organisms/EquipoTecnicoSection";

export const DIRECTIVOS: Directivo[] = [
  {
    name: "Dra. Elena Rivas",
    role: "DIRECTORA DE PROYECTO",
    description:
      "Especialista en sistemas complejos y salud comunitaria por MIT. Lidera la visión estratégica y la integración metodológica.",
  },
  {
    name: "Dr. Jorge Valdés",
    role: "LÍDER DE DATOS",
    description:
      "Analista cuantitativo con enfoque en modelos predictivos de impacto. Coordina la infraestructura tecnológica y datos urbanos.",
  },
];

export const EQUIPO_TECNICO: MiembroTecnico[] = [
  { name: "Sofía Arreola", role: "Arquitecta Urbanista", tag: "SUELO"      },
  { name: "Mateo Ruiz",    role: "DevOps Engineer",      tag: "SISTEMAS"   },
  { name: "Lucía Méndez",  role: "Antropóloga Social",   tag: "SOCIAL"     },
  { name: "Carlos Torres", role: "Analista GIS",         tag: "TERRITORIO" },
  { name: "Valeria Luna",  role: "Especialista BIM",     tag: "SUELO"      },
  { name: "Diego Ferré",   role: "Frontend Lead",        tag: "SISTEMAS"   },
  { name: "Ana Paula",     role: "Mediadora Com.",        tag: "SOCIAL"     },
  { name: "Raúl G.",       role: "Ecólogo Urbano",       tag: "TERRITORIO" },
  { name: "Inés Vega",     role: "Ciencia de Datos",     tag: "SISTEMAS"   },
  { name: "Hugo Boss",     role: "Legal Project Mgr",    tag: "SOCIAL"     },
  { name: "Marta Díaz",    role: "Planificadora",        tag: "SUELO"      },
  { name: "Kevin M.",      role: "QA Tester",            tag: "SISTEMAS"   },
  { name: "Julia Sol",     role: "Diseño Visual",        tag: "SOCIAL"     },
  { name: "Esteban Q.",    role: "Hidrólogo",            tag: "TERRITORIO" },
];
