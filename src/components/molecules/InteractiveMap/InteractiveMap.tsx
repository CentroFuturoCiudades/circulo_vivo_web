"use client";

import { useEffect, useRef, useState } from "react";
import Map, { Layer, NavigationControl, Source, type MapRef, type MapLayerMouseEvent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const MEXICO_CENTER = { longitude: -102.5, latitude: 23.6, zoom: 5 };

const MEXICO_STATES_URL =
  "https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json";

// Sede (HQ) state — crimson
const SEDE_COLOR = "#852038";
// Presence states — navy
const PRESENCE_COLOR = "#395284";
// Overview (all filtered, no selection) — teal
const ACTIVE_COLOR = "#708b8d";

// ── Types ──────────────────────────────────────────────────

export interface InteractiveMapProps {
  /** Sede-state names of all currently filtered initiatives — overview fill */
  stateNames?: string[];
  /** Sede state of the selected initiative — highlighted in crimson */
  selectedStateName?: string;
  /** Presence states of the selected initiative — highlighted in navy */
  selectedPresenceStates?: string[];
  /** Called when the user clicks an active state on the map */
  onStateClick?: (stateName: string) => void;
  className?: string;
}

// ── Component ──────────────────────────────────────────────

export function InteractiveMap({
  stateNames = [],
  selectedStateName,
  selectedPresenceStates = [],
  onStateClick,
  className,
}: InteractiveMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const activeStatesSet = new Set(stateNames);

  function handleMapClick(e: MapLayerMouseEvent) {
    if (!onStateClick) return;
    const name = e.features?.[0]?.properties?.name as string | undefined;
    if (name && activeStatesSet.has(name)) onStateClick(name);
  }

  function handleMouseMove(e: MapLayerMouseEvent) {
    const name = e.features?.[0]?.properties?.name as string | undefined;
    setHoveredState((name && activeStatesSet.has(name)) ? name : null);
  }

  // Fit to the sede state's bounding box when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!selectedStateName) {
      map.flyTo({
        center: [MEXICO_CENTER.longitude, MEXICO_CENTER.latitude],
        zoom: MEXICO_CENTER.zoom,
        duration: 700,
        essential: true,
      });
      return;
    }

    function fitToStateBounds(): boolean {
      const features = map!.querySourceFeatures("mx-states");
      const lngs: number[] = [];
      const lats: number[] = [];

      for (const f of features) {
        if (f.properties?.name !== selectedStateName) continue;
        const geom = f.geometry;
        const rings =
          geom.type === "Polygon"      ? geom.coordinates :
          geom.type === "MultiPolygon" ? geom.coordinates.flat(1) : [];
        for (const ring of rings) {
          for (const [lng, lat] of ring) {
            lngs.push(lng as number);
            lats.push(lat as number);
          }
        }
      }

      if (!lngs.length) return false;

      map!.fitBounds(
        [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
        { padding: 80, maxZoom: 8, duration: 700, essential: true }
      );
      return true;
    }

    if (!fitToStateBounds()) {
      const onSourceData = () => {
        if (fitToStateBounds()) map.off("sourcedata", onSourceData);
      };
      map.on("sourcedata", onSourceData);
      return () => { map.off("sourcedata", onSourceData); };
    }
  }, [selectedStateName]);

  // ── MapLibre fill/line expressions ────────────────────────
  // Priority: sede > presencia > overview > transparent

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fillColor: any = [
    "case",
    ...(selectedStateName
      ? [["==", ["get", "name"], selectedStateName], SEDE_COLOR]
      : []),
    ...(selectedPresenceStates.length > 0
      ? [["in", ["get", "name"], ["literal", selectedPresenceStates]], PRESENCE_COLOR]
      : []),
    ...(stateNames.length > 0
      ? [["in", ["get", "name"], ["literal", stateNames]], ACTIVE_COLOR]
      : []),
    "transparent",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fillOpacity: any = [
    "case",
    ...(selectedStateName
      ? [["==", ["get", "name"], selectedStateName], 0.50]
      : []),
    ...(selectedPresenceStates.length > 0
      ? [["in", ["get", "name"], ["literal", selectedPresenceStates]], 0.28]
      : []),
    ...(stateNames.length > 0
      ? [["in", ["get", "name"], ["literal", stateNames]], 0.15]
      : []),
    0,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineColor: any = [
    "case",
    ...(selectedStateName
      ? [["==", ["get", "name"], selectedStateName], SEDE_COLOR]
      : []),
    ...(selectedPresenceStates.length > 0
      ? [["in", ["get", "name"], ["literal", selectedPresenceStates]], PRESENCE_COLOR]
      : []),
    ...(stateNames.length > 0
      ? [["in", ["get", "name"], ["literal", stateNames]], ACTIVE_COLOR]
      : []),
    "transparent",
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineOpacity: any = [
    "case",
    ...(selectedStateName
      ? [["==", ["get", "name"], selectedStateName], 0.70]
      : []),
    ...(selectedPresenceStates.length > 0
      ? [["in", ["get", "name"], ["literal", selectedPresenceStates]], 0.50]
      : []),
    ...(stateNames.length > 0
      ? [["in", ["get", "name"], ["literal", stateNames]], 0.35]
      : []),
    0,
  ];

  const showLegend = !!selectedStateName || selectedPresenceStates.length > 0;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {showLegend && (
        <div className="absolute bottom-10 left-4 z-10 flex flex-col gap-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-[#c4c7c7] px-3 py-2.5 shadow-sm pointer-events-none">
          {selectedStateName && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: SEDE_COLOR, opacity: 0.55 }} />
              <span className="font-sans text-[11px] font-semibold text-[#3d3d30] uppercase tracking-[0.08em]">Sede</span>
            </div>
          )}
          {selectedPresenceStates.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: PRESENCE_COLOR, opacity: 0.35 }} />
              <span className="font-sans text-[11px] font-semibold text-[#3d3d30] uppercase tracking-[0.08em]">Presencia</span>
            </div>
          )}
        </div>
      )}
      <Map
        ref={mapRef}
        initialViewState={MEXICO_CENTER}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        reuseMaps
        interactiveLayerIds={onStateClick ? ["mx-states-fill"] : []}
        cursor={hoveredState ? "pointer" : undefined}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredState(null)}
      >
        <Source id="mx-states" type="geojson" data={MEXICO_STATES_URL}>
          <Layer
            id="mx-states-fill"
            type="fill"
            paint={{
              "fill-color":   fillColor,
              "fill-opacity": fillOpacity,
            }}
          />
          <Layer
            id="mx-states-border"
            type="line"
            paint={{
              "line-color":   lineColor,
              "line-width":   0.75,
              "line-opacity": lineOpacity,
            }}
          />
        </Source>

        <NavigationControl position="bottom-right" showCompass={false} />
      </Map>
    </div>
  );
}
