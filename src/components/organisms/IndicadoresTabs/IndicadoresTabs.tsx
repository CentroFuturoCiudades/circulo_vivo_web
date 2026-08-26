"use client";

import { useState } from "react";
import { Tab } from "@/components/atoms/Tab";
import { DataUnavailableMessage } from "@/components/molecules/DataUnavailableMessage";
import { IndicadoresConoceSection } from "@/components/organisms/IndicadoresConoceSection";
import { IndicadoresDashboard } from "@/components/organisms/IndicadoresDashboard";
import type { DataResult } from "@/lib/data/types";
import type { IndicadoresDataset } from "@/lib/azure/indicadores";

export interface IndicadoresTabsProps {
  dashboardResult: DataResult<IndicadoresDataset>;
}

type TabKey = "conoce" | "explora";

/** Tab shell for /indicadores — "Conoce" is a static explainer, "Explora" is the real dashboard. */
export function IndicadoresTabs({ dashboardResult }: IndicadoresTabsProps) {
  const [tab, setTab] = useState<TabKey>("conoce");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Secciones de indicadores"
        className="flex justify-center gap-2 mb-10 border-b border-neutral-200"
      >
        <Tab active={tab === "conoce"} onClick={() => setTab("conoce")}>
          Conoce
        </Tab>
        <Tab active={tab === "explora"} onClick={() => setTab("explora")}>
          Explora
        </Tab>
      </div>

      {tab === "conoce" ? (
        <IndicadoresConoceSection onExplorar={() => setTab("explora")} />
      ) : dashboardResult.status === "success" ? (
        <IndicadoresDashboard dataset={dashboardResult.data} />
      ) : (
        <DataUnavailableMessage
          variant={dashboardResult.status === "unconfigured" ? "empty" : "error"}
          title="Tablero de indicadores no disponible"
          description="No fue posible cargar los datos del semáforo estatal en este momento."
        />
      )}
    </div>
  );
}
