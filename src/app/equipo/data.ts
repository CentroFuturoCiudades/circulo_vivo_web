import type { Directivo } from "@/components/organisms/DirectivosSection";
import type { MiembroTecnico } from "@/components/organisms/EquipoTecnicoSection";
import type { Colaborador, InstitutionLogo } from "@/components/organisms/ColaboracionesSection";

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
  {
    name: "Sofía Arreola", role: "Arquitecta Urbanista", tag: "SUELO",
    description: "Diseña estrategias de uso de suelo agrícola y periurbano, integrando criterios de resiliencia climática en la planeación territorial.",
    email: "sofia.arreola@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/sofia-arreola" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Mateo Ruiz", role: "DevOps Engineer", tag: "SISTEMAS",
    description: "Mantiene la infraestructura de datos del proyecto, asegurando disponibilidad y trazabilidad de las plataformas de monitoreo.",
    email: "mateo.ruiz@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/mateo-ruiz" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Lucía Méndez", role: "Antropóloga Social", tag: "SOCIAL",
    description: "Investiga las dinámicas comunitarias alrededor de la producción y el consumo de alimentos en contextos urbanos y rurales.",
    email: "lucia.mendez@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/lucia-mendez" }, { platform: "instagram", url: "https://instagram.com/lucia.mendez" }],
  },
  {
    name: "Carlos Torres", role: "Analista GIS", tag: "TERRITORIO",
    description: "Procesa y visualiza datos geoespaciales para mapear iniciativas y patrones de transformación del territorio.",
    email: "carlos.torres@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/carlos-torres" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Valeria Luna", role: "Especialista BIM", tag: "SUELO",
    description: "Modela infraestructura sostenible aplicando estándares BIM para proyectos de regeneración de suelo.",
    email: "valeria.luna@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/valeria-luna" }],
  },
  {
    name: "Diego Ferré", role: "Frontend Lead", tag: "SISTEMAS",
    description: "Lidera el desarrollo de las herramientas digitales del proyecto, del mapa interactivo al panel de indicadores.",
    email: "diego.ferre@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/diego-ferre" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Ana Paula", role: "Mediadora Com.", tag: "SOCIAL",
    description: "Facilita el diálogo entre comunidades, organizaciones y autoridades para articular acciones colaborativas.",
    email: "ana.paula@circulovivo.org",
    socials: [{ platform: "instagram", url: "https://instagram.com/ana.paula" }, { platform: "twitter", url: "https://x.com/ana_paula" }],
  },
  {
    name: "Raúl G.", role: "Ecólogo Urbano", tag: "TERRITORIO",
    description: "Estudia la interacción entre ecosistemas urbanos y sistemas alimentarios para proponer soluciones basadas en la naturaleza.",
    email: "raul.g@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/raul-g" }],
  },
  {
    name: "Inés Vega", role: "Ciencia de Datos", tag: "SISTEMAS",
    description: "Desarrolla modelos predictivos e indicadores de impacto a partir de los datos recolectados en campo.",
    email: "ines.vega@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/ines-vega" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Hugo Boss", role: "Legal Project Mgr", tag: "SOCIAL",
    description: "Coordina los marcos legales y de gobernanza que sostienen las alianzas interinstitucionales del proyecto.",
    email: "hugo.boss@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/hugo-boss" }],
  },
  {
    name: "Marta Díaz", role: "Planificadora", tag: "SUELO",
    description: "Traduce hallazgos de investigación en planes de acción territorial junto con actores locales.",
    email: "marta.diaz@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/marta-diaz" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Kevin M.", role: "QA Tester", tag: "SISTEMAS",
    description: "Garantiza la calidad y confiabilidad de las herramientas digitales antes de su despliegue público.",
    email: "kevin.m@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/kevin-m" }],
  },
  {
    name: "Julia Sol", role: "Diseño Visual", tag: "SOCIAL",
    description: "Da forma visual a la identidad del proyecto y a la comunicación de sus hallazgos hacia audiencias diversas.",
    email: "julia.sol@circulovivo.org",
    socials: [{ platform: "instagram", url: "https://instagram.com/julia.sol" }, { platform: "website", url: "https://circulovivo.org" }],
  },
  {
    name: "Esteban Q.", role: "Hidrólogo", tag: "TERRITORIO",
    description: "Analiza la disponibilidad y gestión del agua como eje crítico de los sistemas alimentarios regionales.",
    email: "esteban.q@circulovivo.org",
    socials: [{ platform: "linkedin", url: "https://linkedin.com/in/esteban-q" }],
  },
];

export const EQUIPO_COLABORADORES: Colaborador[] = [
  { name: "Andrea Solís",   role: "Enlace ITESO" },
  { name: "Miguel Herrera", role: "Coordinador CONEVAL" },
  { name: "Renata Gómez",   role: "Consultora FAO" },
  { name: "David Chávez",   role: "Investigador Asociado" },
  { name: "Paola Reyes",    role: "Enlace INEGI" },
  { name: "Tomás Nuño",     role: "Coordinador de Vinculación" },
  { name: "Ximena Castro",  role: "Analista de Políticas" },
  { name: "Iván Barragán",  role: "Enlace MIT Media Lab" },
];

/** Only the logo — no descriptions. Drop a real `logoUrl` (SVG/PNG) per entry once assets are available; falls back to a monochrome wordmark. */
export const INSTITUCIONES_COLABORADORAS: InstitutionLogo[] = [
  { name: "ITESO" },
  { name: "CONEVAL" },
  { name: "FAO" },
  { name: "INEGI" },
  { name: "ONU" },
  { name: "MIT Media Lab" },
];
