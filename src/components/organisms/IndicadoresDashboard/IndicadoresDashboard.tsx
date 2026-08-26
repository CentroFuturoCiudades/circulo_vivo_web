"use client";

import { useMemo, useState } from "react";
import { Info, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/molecules/Card";
import { SimpleModal } from "@/components/molecules/SimpleModal";
import { KPICard } from "@/components/molecules/KPICard";
import { FilterDropdown } from "@/components/molecules/FilterDropdown";
import { DomainPill } from "@/components/molecules/DomainPill";
import { IndicatorCompareList, type IndicatorCompareItem } from "@/components/molecules/IndicatorCompareList";
import { IndicatorHistoryChart } from "@/components/molecules/IndicatorHistoryChart";
import { RelationScatterChart } from "@/components/molecules/RelationScatterChart";
import { StateRankingChart } from "@/components/molecules/StateRankingChart";
import { DomainRadarChart } from "@/components/molecules/DomainRadarChart";
import { StateCodeGrid } from "@/components/molecules/StateCodeGrid";
import { DOMAIN_KEYS, DOMAIN_LABELS, type DomainKey, type IndicadoresDataset } from "@/lib/azure/indicadores";
import { domainValue, nationalDomainValue, indicatorMinMax, toTrackPercent, pctChange, changeDirectionWord, type DomainOrIgta } from "@/lib/indicadores/helpers";
import { fmtNum, corrLabel } from "@/lib/indicadores/tier";
import { DOMAIN_INFO, INDICATOR_DESC, INDICATOR_UNIT, RELATIONS, RESULTADOS_SUBTITLES } from "./content";

export interface IndicadoresDashboardProps {
  dataset: IndicadoresDataset;
  initialState?: string;
}

const DOMAIN_SELECT_OPTIONS: { value: DomainOrIgta; label: string }[] = [
  { value: "igta", label: "Todo en conjunto (índice general)" },
  ...DOMAIN_KEYS.map((k) => ({ value: k, label: DOMAIN_LABELS[k] })),
];

export function IndicadoresDashboard({ dataset, initialState }: IndicadoresDashboardProps) {
  const [selectedState, setSelectedState] = useState(initialState ?? dataset.states[0] ?? "");
  const [selectedDomain, setSelectedDomain] = useState<DomainOrIgta>("igta");
  const [selectedPill, setSelectedPill] = useState<DomainKey>("impulsores");
  const [selectedRelation, setSelectedRelation] = useState(RELATIONS[0].key);
  const [domainModal, setDomainModal] = useState<DomainKey | null>(null);
  const [methodModalOpen, setMethodModalOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);

  const stateOptions = useMemo(() => dataset.states.map((s) => ({ value: s, label: s })), [dataset.states]);

  const isImpulsores = selectedDomain === "impulsores";
  const domainLabel = selectedDomain === "igta" ? "el índice general" : DOMAIN_LABELS[selectedDomain].toLowerCase();
  const pillLabel = DOMAIN_LABELS[selectedPill].toLowerCase();

  // ── Pills (always the 5 domains) ──
  const pillItems = DOMAIN_KEYS.map((key) => ({
    key,
    label: DOMAIN_LABELS[key],
    value: domainValue(dataset, selectedState, key),
  }));

  function handlePillSelect(key: DomainKey) {
    setSelectedPill(key);
    setSelectedDomain(key);
    setSelectedIndicator(null);
  }

  // ── Indicator table for the selected pill ──
  const indicatorEntries = dataset.indicatorsByState[selectedState]?.[selectedPill] ?? [];

  const compareItems: IndicatorCompareItem[] = indicatorEntries.map((entry) => {
    const desc = INDICATOR_DESC[entry.name];
    const unit = INDICATOR_UNIT[entry.name];
    const subtopic = selectedPill === "resultados" ? RESULTADOS_SUBTITLES[entry.name] : undefined;

    if (isPillPlain(selectedPill)) {
      return {
        name: entry.name,
        description: desc,
        subtopic,
        nationalFallback: entry.nationalFallback,
        plain: true,
        stateValueLabel: entry.value != null ? `${fmtNum(entry.value)}${unit ? " " + unit : ""}` : "s/d",
        nationalValueLabel: entry.nationalValue != null ? `${fmtNum(entry.nationalValue)}${unit ? " " + unit : ""}` : "s/d",
      };
    }

    if (entry.value == null || entry.nationalValue == null) {
      return { name: entry.name, description: desc, subtopic, nationalFallback: entry.nationalFallback };
    }

    const range = indicatorMinMax(dataset, selectedPill, entry.name);
    if (!range) {
      return { name: entry.name, description: desc, subtopic, nationalFallback: entry.nationalFallback };
    }
    const min = Math.min(range.min, entry.nationalValue);
    const max = Math.max(range.max, entry.nationalValue);
    if (max === min) {
      return { name: entry.name, description: desc, subtopic, nationalFallback: entry.nationalFallback };
    }

    return {
      name: entry.name,
      description: desc,
      unit,
      source: entry.source,
      subtopic,
      nationalFallback: entry.nationalFallback,
      statePercent: toTrackPercent(entry.value, min, max, entry.direction),
      nationalPercent: toTrackPercent(entry.nationalValue, min, max, entry.direction),
      stateTitle: `${selectedState}: ${fmtNum(entry.value)}${unit ? " " + unit : ""}`,
      nationalTitle: `Nacional${entry.nationalFallback ? " (promedio de las 32 entidades)" : ""}: ${fmtNum(entry.nationalValue)}${unit ? " " + unit : ""}`,
    };
  });

  // ── History chart ──
  const activeIndicatorName = selectedIndicator ?? indicatorEntries[0]?.name ?? null;
  const activeIndicator = indicatorEntries.find((e) => e.name === activeIndicatorName) ?? null;
  const histAvailable = !!(activeIndicator?.prevYear != null && activeIndicator?.prevValue != null);
  const histChangePct = histAvailable ? pctChange(activeIndicator!.prevValue, activeIndicator!.value) : null;

  // ── Relation scatter ──
  const relationConfig = RELATIONS.find((r) => r.key === selectedRelation) ?? RELATIONS[0];
  const relation = dataset.relations[selectedRelation];
  const scatterPoints = (relation?.points ?? []).map((p) => ({ x: p.x, y: p.y, label: p.state }));

  // ── Ranking + grid + radar (hidden for impulsores) ──
  const rankingItems = dataset.states.map((s) => ({ state: s, value: domainValue(dataset, s, selectedDomain) }));
  const gridItems = dataset.states.map((s) => ({ state: s, code: dataset.stateCodes[s], value: domainValue(dataset, s, selectedDomain) }));
  const radarDomains = DOMAIN_KEYS.filter((k) => k !== "impulsores");
  const radarPoints = radarDomains.map((k) => ({
    domain: DOMAIN_LABELS[k],
    stateValue: domainValue(dataset, selectedState, k),
    nationalValue: nationalDomainValue(dataset, k),
  }));

  return (
    <div>
      {/* ── Relation explorer ── */}
      <SectionCard className="mb-6 print:hidden" title="¿Cómo se conectan las piezas del sistema alimentario?">
        <div className="mb-3 max-w-md">
          <FilterDropdown
            label="Elige qué relación explorar"
            options={RELATIONS.map((r) => ({ value: r.key, label: r.label }))}
            value={selectedRelation}
            onChange={(v) => v && setSelectedRelation(v)}
          />
        </div>
        <p className="font-sans font-bold text-[14px] text-[#1a1c1c] mb-1">{relationConfig.title}</p>
        <p className="font-sans text-[12px] text-[#71717a] mb-2">{relationConfig.sub}</p>
        <RelationScatterChart
          points={scatterPoints}
          highlightLabel={selectedState}
          xLabel={relationConfig.xMin != null ? relation?.xLabel ?? "" : relation?.xLabel ?? ""}
          yLabel={relation?.yLabel ?? ""}
          xMin={relationConfig.xMin}
          xMax={relationConfig.xMax}
          yMin={relationConfig.yMin}
          yMax={relationConfig.yMax}
          tooltip={(label) => label}
        />
        <div className="flex items-center justify-between mt-2 text-[10.5px] text-[#71717a] font-sans">
          <span>{relationConfig.quadLeft}</span>
          <span>{relationConfig.quadRight}</span>
        </div>
        {relation && (
          <p className="font-sans text-[12px] text-[#71717a] mt-2">
            Correlación entre estados (rango de Spearman): {relation.spearman.toFixed(2)}, {corrLabel(relation.spearman)} (n={relation.n}).
          </p>
        )}
      </SectionCard>

      {/* ── Section title ── */}
      <h2 className="font-serif font-bold text-[22px] text-[#203b6b] pb-2 mb-4 border-b-2 border-[#DED4B0]">
        ¿Cuál es el desempeño de tu estado en el sistema alimentario?
      </h2>

      {/* ── Toolbar ── */}
      <div
        className="flex flex-wrap items-center gap-4 bg-white border border-[#e2e2e2] rounded-lg p-4 mb-5 print:hidden"
        style={{ boxShadow: "0 1px 3px rgba(33,33,33,.05)" }}
      >
        <FilterDropdown
          label="Tu estado"
          options={stateOptions}
          value={selectedState}
          onChange={(v) => v && setSelectedState(v)}
        />
        <FilterDropdown
          label="¿Qué quieres comparar?"
          options={DOMAIN_SELECT_OPTIONS}
          value={selectedDomain}
          onChange={(v) => v && setSelectedDomain(v as DomainOrIgta)}
        />
        <Button
          type="button"
          variant="outline"
          color="navy"
          size="sm"
          radius="sm"
          iconRight={Printer}
          onClick={() => window.print()}
          className="ml-auto normal-case tracking-normal font-normal"
        >
          Imprimir resultados de mi estado (PDF)
        </Button>
      </div>

      {/* ── Print-only header ── */}
      <div className="hidden print:block mb-4">
        <h2 className="font-serif font-bold text-[20px]">Semáforo estatal de transformación alimentaria</h2>
        <p className="text-[13px] text-[#71717a]">Resultados de {selectedState}</p>
      </div>

      {/* ── Domain pills ── */}
      <div className="flex gap-4 flex-wrap mb-2 print:hidden">
        {pillItems.map((p) => (
          <DomainPill
            key={p.key}
            label={p.label}
            value={p.value}
            active={p.key === selectedPill}
            onSelect={() => handlePillSelect(p.key)}
            onInfo={() => setDomainModal(p.key)}
          />
        ))}
      </div>
      <Button
        type="button"
        variant="link"
        color="navy"
        size="sm"
        iconRight={Info}
        onClick={() => setMethodModalOpen(true)}
        className="mb-5 normal-case tracking-normal font-normal text-[12.5px] print:hidden"
      >
        ¿Cómo se calculan estos resultados?
      </Button>

      {/* ── Indicator table + history ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mb-5">
        <SectionCard title={`Indicadores de ${pillLabel}`}>
          <IndicatorCompareList stateName={selectedState} items={compareItems} showLegend={!isPillPlain(selectedPill)} />
        </SectionCard>

        <SectionCard title={`¿Cómo han cambiado los indicadores de ${pillLabel} en la última década?`}>
          <div className="mb-3 print:hidden">
            <FilterDropdown
              label="Elige un indicador"
              options={indicatorEntries.map((e) => ({ value: e.name, label: e.name }))}
              value={activeIndicatorName ?? undefined}
              onChange={(v) => v && setSelectedIndicator(v)}
            />
          </div>
          <IndicatorHistoryChart
            oldYear={activeIndicator?.prevYear}
            oldValue={activeIndicator?.prevValue}
            year={activeIndicator?.year}
            value={activeIndicator?.value}
          />
          {histAvailable && histChangePct !== null && (
            <p className="font-sans text-[12px] text-[#71717a] mt-2">
              Fuente: {activeIndicator?.source ?? "—"} &nbsp;·&nbsp; {selectedState} {changeDirectionWord(histChangePct)} entre{" "}
              {activeIndicator?.prevYear} y {activeIndicator?.year}.
            </p>
          )}
        </SectionCard>
      </div>

      {/* ── Comparativo (hidden for impulsores) ── */}
      {isImpulsores ? (
        <SectionCard className="mb-5 print:hidden" title="¿Qué papel juegan los impulsores en el sistema alimentario?">
          <p className="font-sans text-[15px] text-[#1a1c1c] leading-relaxed mb-3">
            Los impulsores son el telón de fondo del sistema alimentario: no son buenos ni malos por sí mismos, sino las
            condiciones de partida que hacen que todo lo demás se comporte de una manera u otra. Por eso aquí no tiene
            mucho sentido preguntar qué estado &quot;va mejor&quot;; lo que importa es entender qué está pasando.
          </p>
          <p className="font-sans text-[15px] text-[#1a1c1c] leading-relaxed">
            Revisa los indicadores de &quot;¿Cuál es el desempeño de tu estado en el sistema alimentario?&quot;, arriba, para
            ver cómo se ve esto en {selectedState}.
          </p>
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 mb-5 items-stretch">
          <SectionCard className="print:hidden" title={`¿Cómo va ${selectedState} en comparación con otros estados?`}>
            <p className="font-sans text-[12px] text-[#71717a] mb-3">
              Los 32 estados ordenados de mejor a peor según {domainLabel}
            </p>
            <StateRankingChart items={rankingItems} nationalAverage={nationalDomainValue(dataset, selectedDomain)} />
          </SectionCard>

          <div className="flex flex-col gap-5">
            <SectionCard className="flex flex-col flex-1" title={`¿Dónde se posiciona ${selectedState} en relación al país?`}>
              <p className="font-sans text-[12px] text-[#71717a] mb-3">Compara tu estado con el país en los cinco temas</p>
              <div className="flex gap-3.5 mb-3">
                <KPICard label="Tu estado" value={domainValue(dataset, selectedState, "igta").toFixed(1)} accent="navy" className="flex-1" />
                <KPICard label="Nacional" value={nationalDomainValue(dataset, "igta").toFixed(1)} accent="teal" className="flex-1" />
              </div>
              <DomainRadarChart stateName={selectedState} points={radarPoints} className="flex-1" />
            </SectionCard>

            <SectionCard className="print:hidden" title={`Mapa de estados según ${domainLabel}`}>
              <p className="font-sans text-[12px] text-[#71717a] mb-3">
                Los 32 estados ordenados por su código oficial de entidad federativa. Da clic en cualquier casilla para
                cambiar de estado.
              </p>
              <StateCodeGrid items={gridItems} selectedState={selectedState} onSelect={setSelectedState} />
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {domainModal && (
        <SimpleModal title={DOMAIN_LABELS[domainModal]} onClose={() => setDomainModal(null)}>
          <p>{DOMAIN_INFO[domainModal]}</p>
        </SimpleModal>
      )}
      {methodModalOpen && (
        <SimpleModal title="¿Cómo se calculan estos resultados?" wide onClose={() => setMethodModalOpen(false)}>
          <p>
            Cada indicador se compara entre los 32 estados y se convierte en un puntaje de 0 a 100: el estado con el peor
            resultado queda cerca de 0, el que tiene el mejor resultado queda cerca de 100, y los demás se ubican en medio
            según qué tan cerca estén de uno u otro.
          </p>
          <p>
            En un puñado de indicadores de agricultura y ganadería, en vez de comparar contra el peor y el mejor valor, se
            usa el lugar que ocupa cada estado en la fila (percentil) — porque uno o dos estados con producción muy
            concentrada distorsionaban la comparación para el resto.
          </p>
          <p>El puntaje de cada tema es el promedio de los indicadores que lo forman, todos con el mismo peso.</p>
          <p>Con ese puntaje de 0 a 100 se arma el semáforo:</p>
          <ul>
            <li>0 a 34: muy preocupante</li>
            <li>35 a 49: preocupante</li>
            <li>50 a 64: aceptable</li>
            <li>65 a 79: bueno</li>
            <li>80 a 100: excelente</li>
          </ul>
          <p>
            Estos cinco cortes dividen la escala en partes iguales, como punto de partida para la discusión; no son
            todavía un estándar oficial validado por especialistas.
          </p>
        </SimpleModal>
      )}
    </div>
  );
}

function isPillPlain(pill: DomainKey): boolean {
  return pill === "impulsores";
}

/** Card molecule + the mockup's serif/underline header, reused across every dashboard panel. */
function SectionCard({
  title, className, children,
}: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <Card
      radius="lg"
      padding="md"
      shadow="none"
      className={cn("border-[#d1c6cf]", className)}
      style={{ boxShadow: "0 1px 2.625px rgba(0,0,0,.04), 0 2px 10.5px rgba(57,82,132,.07)" }}
    >
      <h2 className="font-serif font-bold text-[20px] text-[#203b6b] pb-2.5 mb-3 border-b-2 border-[#DED4B0]">
        {title}
      </h2>
      {children}
    </Card>
  );
}

