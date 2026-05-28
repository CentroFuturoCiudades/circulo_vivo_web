"use client";
import { useState } from "react";
import type { Indicator } from "@/types/indicator";
import data from "@/data/indicators.json";

export function useIndicators() {
  const [indicators] = useState<Indicator[]>(data as Indicator[]);
  return { indicators };
}
