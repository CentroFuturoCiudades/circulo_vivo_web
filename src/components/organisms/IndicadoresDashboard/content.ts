import type { DomainKey } from "@/lib/azure/indicadores";

/**
 * Presentation-only copy (descriptions, units, relation framing) that isn't
 * part of the raw data matrix — kept here as static content, same convention
 * the source dashboard used for its INDICATOR_DESC/INDICATOR_UNIT dicts.
 */

export const DOMAIN_INFO: Record<DomainKey, string> = {
  impulsores:
    "Lo que empuja el cambio detrás de bambalinas: cuántas personas hay que cuidar (niños y personas mayores), qué tanta escuela tuvo la gente, y cómo es el clima donde vive cada estado.",
  cadena:
    "De dónde sale la comida: mide agricultura y ganadería por separado, con las mismas tres preguntas para cada una (cuánto espacio ocupa, cuánto se produce y qué tan eficiente es esa producción), ajustado al tamaño de la población para poder comparar estados grandes y chicos en igualdad de condiciones.",
  entorno:
    "Qué tan fácil es conseguir comida buena cerca de casa: cuántas tiendas de alimentos frescos hay comparadas con las de dulces y comida chatarra en cada estado.",
  consumidor:
    "Cómo come la gente en su día a día: si come frutas y verduras seguido, y qué tanto del gasto del hogar se destina a comprarlas.",
  resultados:
    "El efecto final de todo lo anterior, en tres partes: qué tan sana está la población (diabetes, obesidad), qué tan equitativo es el acceso a la alimentación (pobreza, inseguridad alimentaria), y qué tan sostenible es el entorno en el que se produce y se vive (agua, aire) en cada estado.",
};

export const INDICATOR_DESC: Record<string, string> = {
  "Tasa de dependencia demográfica (%)": "Compara la población infantil y adulta mayor con la población en edad de trabajar, en cada estado.",
  "Escolaridad promedio (grado)": "Años de estudio promedio de la población del estado.",
  "Precipitación media anual (mm)": "Cantidad de lluvia que recibe el estado en promedio al año.",
  "Temperatura media anual (°C)": "Temperatura promedio anual del estado.",
  "Superficie cosechada (ha/1,000 hab.)": "Hectáreas cosechadas por cada mil habitantes del estado.",
  "Producción agrícola (ton/1,000 hab.)": "Toneladas de producción agrícola por cada mil habitantes del estado.",
  "Rendimiento agrícola (ton/ha cosechada)": "Toneladas producidas por cada hectárea cosechada.",
  "Cabezas de ganado (bovino/caprino/ovino/porcino/ave) por 1,000 hab.": "Número de cabezas de ganado (bovino, caprino, ovino, porcino y ave) por cada mil habitantes del estado.",
  "Producción pecuaria (ton/1,000 hab.)": "Toneladas de producción pecuaria (carne y otros productos de origen animal) por cada mil habitantes del estado.",
  "Rendimiento pecuario (kg producidos/cabeza)": "Kilogramos producidos por cada cabeza de ganado.",
  "Comercios de abarrotes y alimentos (unid./10,000 hab.)": "Número de comercios de abarrotes y alimentos por cada diez mil habitantes del estado.",
  "Comercios de frutas y verduras frescas (%)": "Proporción de comercios que venden frutas y verduras frescas.",
  "Comercios de dulces y repostería (%)": "Proporción de comercios que venden dulces y repostería.",
  "Inseguridad alimentaria severa (%)": "Porcentaje de hogares que no tuvieron acceso suficiente a alimentos por falta de recursos, al grado de dejar de comer.",
  "Consumo diario de frutas y verduras (%)": "Porcentaje de población que consume frutas y verduras todos los días.",
  "Gasto en frutas, verduras y legumbres (% del gasto del hogar)": "Proporción del gasto total del hogar que se destina a frutas, verduras y legumbres.",
  "Diabetes en adultos (%)": "Prevalencia de diabetes en la población adulta.",
  "Obesidad en adultos (%)": "Prevalencia de obesidad en la población adulta.",
  "Población en pobreza (%)": "Porcentaje de población en situación de pobreza.",
  "Presión sobre recursos hídricos (%)": "Proporción del agua renovable disponible que ya se está utilizando en el estado.",
  "Contaminación del aire (mcg/m3)": "Concentración de partículas contaminantes en el aire del estado.",
};

export const INDICATOR_UNIT: Record<string, string> = {
  "Tasa de dependencia demográfica (%)": "%",
  "Escolaridad promedio (grado)": "grado",
  "Precipitación media anual (mm)": "mm",
  "Temperatura media anual (°C)": "°C",
  "Superficie cosechada (ha/1,000 hab.)": "ha/1,000 hab.",
  "Producción agrícola (ton/1,000 hab.)": "ton/1,000 hab.",
  "Rendimiento agrícola (ton/ha cosechada)": "ton/ha cosechada",
  "Cabezas de ganado (bovino/caprino/ovino/porcino/ave) por 1,000 hab.": "cabezas/1,000 hab.",
  "Producción pecuaria (ton/1,000 hab.)": "ton/1,000 hab.",
  "Rendimiento pecuario (kg producidos/cabeza)": "kg/cabeza",
  "Comercios de abarrotes y alimentos (unid./10,000 hab.)": "unid./10,000 hab.",
  "Comercios de frutas y verduras frescas (%)": "%",
  "Comercios de dulces y repostería (%)": "%",
  "Inseguridad alimentaria severa (%)": "%",
  "Consumo diario de frutas y verduras (%)": "%",
  "Gasto en frutas, verduras y legumbres (% del gasto del hogar)": "% del gasto del hogar",
  "Diabetes en adultos (%)": "%",
  "Obesidad en adultos (%)": "%",
  "Población en pobreza (%)": "%",
  "Presión sobre recursos hídricos (%)": "%",
  "Contaminación del aire (mcg/m3)": "mcg/m3",
};

export interface RelationConfig {
  key: string;
  label: string;
  title: string;
  sub: string;
  quadLeft: string;
  quadRight: string;
  xMin: number | null; xMax: number | null; yMin: number | null; yMax: number | null;
}

export const RELATIONS: RelationConfig[] = [
  {
    key: "produccion_concesion",
    label: "Producción agrícola y volumen concesionado para uso agrícola",
    title: "¿A mayor volumen de agua concesionada, mayor producción agrícola?",
    sub: "Aquí puedes ver si los estados con más agua concesionada para uso agropecuario también son los que más producen en el campo, o si no hay relación clara. Cada punto es un estado (el tuyo aparece resaltado). Ambos indicadores se muestran en percentil, porque el volumen concesionado varía en un rango muy amplio entre entidades.",
    quadLeft: "Menos agua concesionada · Más producción",
    quadRight: "Más agua concesionada · Menos producción",
    xMin: 0, xMax: 100, yMin: 0, yMax: 100,
  },
  {
    key: "gasto_frescos",
    label: "% del gasto en frutas y verduras y comercios de frutas y verduras frescas",
    title: "¿A mayor porcentaje del gasto destinado a frutas y verduras, más comercios de frutas y verduras frescas?",
    sub: "Aquí puedes ver si los estados que destinan una mayor parte de su gasto de hogar a frutas y verduras también son los que tienen más variedad de comercios de alimentos frescos, o si no hay relación clara. Cada punto es un estado (el tuyo aparece resaltado).",
    quadLeft: "Menor % de gasto · Más comercios frescos",
    quadRight: "Mayor % de gasto · Menos comercios frescos",
    xMin: 0, xMax: 100, yMin: 0, yMax: null,
  },
  {
    key: "inseguridad_agua",
    label: "Inseguridad alimentaria y agua potable",
    title: "¿A menor cobertura de agua potable, más inseguridad alimentaria?",
    sub: "Aquí puedes ver si los estados con menor cobertura de agua potable son también los que reportan más inseguridad alimentaria severa, o si no hay relación clara. Cada punto es un estado (el tuyo aparece resaltado).",
    quadLeft: "Más agua potable · Menos inseguridad",
    quadRight: "Menos agua potable · Más inseguridad",
    xMin: 0, xMax: 100, yMin: 0, yMax: null,
  },
  {
    key: "primario_produccion",
    label: "Trabajadores del campo y producción agrícola",
    title: "¿A más trabajadores del campo, más producción agrícola?",
    sub: "Aquí puedes ver si los estados con mayor proporción de personas trabajando en el sector primario son también los que más producen en el campo, o si no hay relación clara. Cada punto es un estado (el tuyo aparece resaltado). La producción se muestra por habitante.",
    quadLeft: "Pocos trabajadores del campo · Mucha producción",
    quadRight: "Muchos trabajadores del campo · Poca producción",
    xMin: 0, xMax: null, yMin: 0, yMax: 100,
  },
];

export const RESULTADOS_SUBTITLES: Record<string, string> = {
  "Diabetes en adultos (%)": "Salud",
  "Población en pobreza (%)": "Equidad",
  "Presión sobre recursos hídricos (%)": "Sostenibilidad",
};
