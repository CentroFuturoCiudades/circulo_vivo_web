import { HomePageClient } from "./HomePageClient";
import { getIniciativas } from "@/lib/data/iniciativas";

export default async function HomePage() {
    const result = await getIniciativas();
    // States the background map tours; if the dataset is unavailable the map falls back to its default list.
    const states =
        result.status === "success"
            ? [...new Set(result.data.map((i) => i.state).filter((s): s is string => Boolean(s)))]
            : undefined;
    return <HomePageClient mapStates={states} />;
}
