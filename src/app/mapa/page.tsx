import { MapaPageClient } from "./MapaPageClient";
import { getIniciativas } from "@/lib/data/iniciativas";
import { toSectionState } from "@/lib/data/types";

export default async function MapaPage() {
  const result = await getIniciativas();
  const { items, state } = toSectionState(result);
  return <MapaPageClient initiatives={items} state={state} />;
}
