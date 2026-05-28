"use server";
import type { Initiative } from "@/types/initiative";
import data from "@/data/initiatives.json";

export async function getInitiatives(): Promise<Initiative[]> {
  return data as Initiative[];
}

export async function getInitiativeById(id: string): Promise<Initiative | null> {
  const initiatives = data as Initiative[];
  return initiatives.find((i) => i.id === id) ?? null;
}
