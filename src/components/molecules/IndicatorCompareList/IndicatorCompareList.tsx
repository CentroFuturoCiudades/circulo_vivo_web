"use client";

import { cn } from "@/lib/utils";

export interface IndicatorCompareItem {
  name: string;
  description?: string;
  unit?: string;
  source?: string;
  /** True when there's no official "Nacional" row for this indicator and the reference value is a fallback average. */
  nationalFallback?: boolean;
  /** Groups items under a subtitle (e.g. "Salud", "Equidad", "Sostenibilidad" within Resultados). */
  subtopic?: string;
  /** Impulsores-style row: plain values, no comparison track (the domain isn't "better/worse"). */
  plain?: boolean;
  stateValueLabel?: string;
  nationalValueLabel?: string;
  /** 0–100 position along the track, already normalized and direction-adjusted. */
  statePercent?: number;
  nationalPercent?: number;
  stateTitle?: string;
  nationalTitle?: string;
}

export interface IndicatorCompareListProps {
  stateName: string;
  items: IndicatorCompareItem[];
  showLegend?: boolean;
  className?: string;
}

/**
 * Per-indicator comparison list: your state's value vs. the national
 * reference, either as a dot-on-a-track (most domains) or as plain values
 * (impulsores, which has no normative "better/worse" direction).
 */
export function IndicatorCompareList({ stateName, items, showLegend = true, className }: IndicatorCompareListProps) {
  const showSubtopicFlags = items.map((it, i) => {
    const prevSubtopic = i > 0 ? items[i - 1].subtopic : undefined;
    return !!it.subtopic && it.subtopic !== prevSubtopic;
  });

  return (
    <div className={className}>
      {showLegend && (
        <div className="flex items-center gap-5 mb-4 text-[12px] text-[#71717a] font-sans">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#395284" }} />
            {stateName}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rotate-45" style={{ background: "#8C5A2B" }} />
            Nacional
          </span>
        </div>
      )}

      <div className="flex flex-col">
        {items.map((it, i) => {
          const showSubtopic = showSubtopicFlags[i];

          return (
            <div key={`${it.name}-${i}`}>
              {showSubtopic && (
                <p
                  className={cn(
                    "font-sans font-bold uppercase text-[11px] text-[#395284] mt-4 pt-2.5 border-t border-[#e8e8e8]",
                    i === 0 && "mt-0 pt-0 border-none"
                  )}
                  style={{ letterSpacing: 0.4 }}
                >
                  {it.subtopic}
                </p>
              )}

              <div className="flex items-center gap-4 py-2.5 border-b border-[#f0f0f0] last:border-none">
                {it.plain ? (
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-semibold text-[12.5px] text-[#1a1c1c]">
                      {it.name}
                      {it.nationalFallback && <FallbackMark />}
                    </p>
                    {it.description && (
                      <p className="font-sans text-[11.5px] text-[#71717a] mt-0.5">{it.description}</p>
                    )}
                    <p className="font-sans text-[12px] text-[#1a1c1c] mt-1.5">
                      <b>{stateName}:</b> {it.stateValueLabel ?? "s/d"} &nbsp;·&nbsp; <b>Nacional:</b>{" "}
                      {it.nationalValueLabel ?? "s/d"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="text-center text-[9.5px] uppercase tracking-wide text-[#9a9a9a] mb-1.5">
                        {it.unit}
                      </div>
                      <div className="relative h-0.5 rounded bg-[#dcdcdc]">
                        {typeof it.nationalPercent === "number" && (
                          <span
                            className="absolute top-1/2 rotate-45"
                            style={{
                              left: `${it.nationalPercent}%`,
                              width: 11,
                              height: 11,
                              borderRadius: 3,
                              background: "#8C5A2B",
                              border: "2px solid #fff",
                              boxShadow: "0 0 0 1px rgba(0,0,0,.12)",
                              transform: "translate(-50%,-50%) rotate(45deg)",
                              zIndex: 1,
                            }}
                            title={it.nationalTitle}
                          />
                        )}
                        {typeof it.statePercent === "number" && (
                          <span
                            className="absolute top-1/2 rounded-full"
                            style={{
                              left: `${it.statePercent}%`,
                              width: 11,
                              height: 11,
                              background: "#395284",
                              border: "2px solid #fff",
                              boxShadow: "0 0 0 1px rgba(0,0,0,.12)",
                              transform: "translate(-50%,-50%)",
                              zIndex: 2,
                            }}
                            title={it.stateTitle}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-[12.5px] text-[#1a1c1c]">
                        {it.name}
                        {it.nationalFallback && <FallbackMark />}
                      </p>
                      {it.description && (
                        <p className="font-sans text-[11.5px] text-[#71717a] mt-0.5">{it.description}</p>
                      )}
                      {it.source && <p className="font-sans text-[10.5px] text-[#9a9a9a] mt-1">Fuente: {it.source}</p>}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FallbackMark() {
  return (
    <span
      title="No hay valor Nacional reportado en la matriz para este indicador; se usa el promedio simple de las 32 entidades como referencia."
      className="ml-1 font-bold cursor-help"
      style={{ color: "#8C5A2B" }}
    >
      †
    </span>
  );
}
