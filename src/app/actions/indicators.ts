"use server";
import type { Indicator } from "@/types/indicator";
import data from "@/data/indicators.json";

export async function getIndicators(): Promise<Indicator[]> {
  return data as Indicator[];
}

export async function getIndicatorById(id: string): Promise<Indicator | null> {
  const indicators = data as Indicator[];
  return indicators.find((i) => i.id === id) ?? null;
}
