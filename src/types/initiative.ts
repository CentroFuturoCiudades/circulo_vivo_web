export interface Initiative {
  id: string;
  title: string;
  description: string;
  category: InitiativeCategory;
  region: string;
  state: string;
  coordinates: [number, number];
  year: number;
  status: "active" | "completed" | "planned";
  tags: string[];
  imageUrl?: string;
}

export type InitiativeCategory =
  | "agricultura"
  | "ganaderia"
  | "pesca"
  | "distribucion"
  | "consumo"
  | "residuos";
