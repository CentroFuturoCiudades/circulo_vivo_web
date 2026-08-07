"use client";

import { useEffect, useRef, useState } from "react";
import Map, { Layer, NavigationControl, Source, type MapRef, type MapMouseEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────

// Mapbox demo — get a free token at https://account.mapbox.com/access-tokens/
// and set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

// Default/overview viewport — framed to show all of Mexico *and* Central
// America (not just Mexico), since sede states can be outside the mx-states
// GeoJSON (e.g. Guatemala). Zoomed/centered further south+east than a
// Mexico-only view would be.
const MEXICO_CENTER = { longitude: -95, latitude: 18.5, zoom: 4.1 };

const MEXICO_STATES_URL =
  "https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json";

// World country polygons — used only for the Central American countries (the
// mx-states GeoJSON above only covers Mexican states), so sede/presence
// values outside Mexico (e.g. "Guatemala") still render as a colored fill
// instead of nothing. Filtered down to CENTRAL_AMERICA_GEOJSON_NAMES via the
// layer `filter` prop below.
const WORLD_COUNTRIES_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

// Our data uses Spanish country names (matching the CSV); this GeoJSON's
// `name` property is in English. Add more Central American countries here as
// needed — both maps stay in sync automatically.
const COUNTRY_NAME_TO_GEOJSON: Record<string, string> = {
  "Guatemala":   "Guatemala",
  "Belice":      "Belize",
  "El Salvador": "El Salvador",
  "Honduras":    "Honduras",
  "Nicaragua":   "Nicaragua",
  "Costa Rica":  "Costa Rica",
  "Panamá":      "Panama",
};
const GEOJSON_NAME_TO_COUNTRY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_NAME_TO_GEOJSON).map(([ours, geojson]) => [geojson, ours])
);
const CENTRAL_AMERICA_GEOJSON_NAMES = Object.values(COUNTRY_NAME_TO_GEOJSON);

/** Translates our Spanish country names to this GeoJSON's English ones, dropping non-matches (e.g. Mexican states). */
function toGeojsonNames(names: string[]): string[] {
  return names.map((n) => COUNTRY_NAME_TO_GEOJSON[n]).filter((n): n is string => !!n);
}

// Basemap tint — recolors the stock light-v11 layers with design-system tones
// (secondary blue for water, warm surface tones for land) instead of the
// default grayscale, which reads as washed out / disabled.
const WATER_COLOR = "#9eb7d7"; // secondary-200, muted
const WATER_OPACITY = 0.55;
const LAND_COLOR = "#fcfbf7"; // surface-sand
const PARK_COLOR = "#f8eec9"; // gold-100

// Overview (unselected initiatives) — brand purple. Avoids gray/teal/blue,
// which read as "disabled" rather than "clickable" against the light basemap.
const ACTIVE_COLOR = "#a574a5";
// Sede + presencia (selected initiative) — same brand crimson; opacity (below)
// differentiates sede (more saturated) from presencia (lighter). Kept out of
// the green/blue family so it never reads as a body of water on the basemap.
const SELECTED_COLOR = "#852038";
const SEDE_COLOR = SELECTED_COLOR;
const PRESENCE_COLOR = SELECTED_COLOR;

// ── Types ──────────────────────────────────────────────────

export interface InteractiveMapProps {
  /** Sede-state names of all currently filtered initiatives — overview fill */
  stateNames?: string[];
  /** Sede state of the selected initiative — highlighted */
  selectedStateName?: string;
  /** Presence states of the selected initiative — highlighted (same color, lighter) */
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
  // Sede outside Mexico (e.g. "Guatemala") — filled via the ca-countries
  // layer below instead of the mx-states one.
  const selectedCountryGeojsonName = selectedStateName
    ? COUNTRY_NAME_TO_GEOJSON[selectedStateName]
    : undefined;
  const stateNamesGeo = toGeojsonNames(stateNames);
  const selectedPresenceStatesGeo = toGeojsonNames(selectedPresenceStates);

  // Feature "name" comes back in Spanish for mx-states, English for
  // ca-countries — normalize to our internal (Spanish) name before matching.
  function resolveFeatureName(e: MapMouseEvent): string | undefined {
    const feature = e.features?.[0];
    const rawName = feature?.properties?.name as string | undefined;
    if (!rawName) return undefined;
    return feature?.layer?.id === "ca-countries-fill" ? GEOJSON_NAME_TO_COUNTRY[rawName] : rawName;
  }

  function handleMapClick(e: MapMouseEvent) {
    if (!onStateClick) return;
    const name = resolveFeatureName(e);
    if (name && activeStatesSet.has(name)) onStateClick(name);
  }

  function handleMouseMove(e: MapMouseEvent) {
    const name = resolveFeatureName(e);
    setHoveredState((name && activeStatesSet.has(name)) ? name : null);
  }

  // The basemap's own state boundaries (admin-1) don't align with the
  // lower-resolution GeoJSON we fill/outline, which reads as a geometry
  // mismatch. Hide the basemap's boundary lines so ours are the only ones.
  // Also recolor water/land to design-system tones instead of the stock grays.
  function handleMapLoad() {
    const map = mapRef.current?.getMap();
    if (!map) return;

    for (const layer of map.getStyle()?.layers ?? []) {
      if (layer.id.includes("admin-1")) {
        map.setLayoutProperty(layer.id, "visibility", "none");
      }
    }

    const setPaint = (layerId: string, prop: string, value: string | number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (map.getLayer(layerId)) map.setPaintProperty(layerId, prop as any, value);
    };
    setPaint("water", "fill-color", WATER_COLOR);
    setPaint("water", "fill-opacity", WATER_OPACITY);
    setPaint("waterway", "line-color", WATER_COLOR);
    setPaint("waterway", "line-opacity", WATER_OPACITY);
    setPaint("water-shadow", "fill-color", WATER_COLOR);
    setPaint("water-shadow", "fill-opacity", WATER_OPACITY);
    setPaint("background", "background-color", LAND_COLOR);
    setPaint("land", "background-color", LAND_COLOR);
    setPaint("landuse", "fill-color", PARK_COLOR);
    setPaint("national-park", "fill-color", PARK_COLOR);
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

    // Sede outside Mexico (e.g. "Guatemala") — fit to its polygon in the
    // ca-countries source instead of mx-states.
    const sourceId = selectedCountryGeojsonName ? "ca-countries" : "mx-states";
    const featureName = selectedCountryGeojsonName ?? selectedStateName;

    function fitToFeatureBounds(): boolean {
      const features = map!.querySourceFeatures(sourceId);
      const lngs: number[] = [];
      const lats: number[] = [];

      for (const f of features) {
        if (f.properties?.name !== featureName) continue;
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

    if (!fitToFeatureBounds()) {
      const onSourceData = () => {
        if (fitToFeatureBounds()) map.off("sourcedata", onSourceData);
      };
      map.on("sourcedata", onSourceData);
      return () => { map.off("sourcedata", onSourceData); };
    }
  }, [selectedStateName, selectedCountryGeojsonName]);

  // ── MapLibre fill/line expressions ────────────────────────
  // Priority: sede > presencia > overview > transparent

  // Builds the four paint expressions for a fill/line layer, given the
  // "name" values to match against for each priority tier (sede > presencia
  // > overview). Reused for both mx-states (Spanish names) and ca-countries
  // (English names).
  function buildPaintExpressions(selected: string | undefined, presence: string[], overview: string[]) {
    /* eslint-disable @typescript-eslint/no-explicit-any -- Mapbox expression types don't line up with our dynamic case-list building */
    return {
      fillColor: [
        "case",
        ...(selected ? [["==", ["get", "name"], selected], SEDE_COLOR] : []),
        ...(presence.length > 0 ? [["in", ["get", "name"], ["literal", presence]], PRESENCE_COLOR] : []),
        ...(overview.length > 0 ? [["in", ["get", "name"], ["literal", overview]], ACTIVE_COLOR] : []),
        "transparent",
      ] as any,
      fillOpacity: [
        "case",
        ...(selected ? [["==", ["get", "name"], selected], 0.50] : []),
        ...(presence.length > 0 ? [["in", ["get", "name"], ["literal", presence]], 0.28] : []),
        ...(overview.length > 0 ? [["in", ["get", "name"], ["literal", overview]], 0.30] : []),
        0,
      ] as any,
      lineColor: [
        "case",
        ...(selected ? [["==", ["get", "name"], selected], SEDE_COLOR] : []),
        ...(presence.length > 0 ? [["in", ["get", "name"], ["literal", presence]], PRESENCE_COLOR] : []),
        ...(overview.length > 0 ? [["in", ["get", "name"], ["literal", overview]], ACTIVE_COLOR] : []),
        "transparent",
      ] as any,
      lineOpacity: [
        "case",
        ...(selected ? [["==", ["get", "name"], selected], 0.70] : []),
        ...(presence.length > 0 ? [["in", ["get", "name"], ["literal", presence]], 0.50] : []),
        ...(overview.length > 0 ? [["in", ["get", "name"], ["literal", overview]], 0.35] : []),
        0,
      ] as any,
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  const mxPaint = buildPaintExpressions(
    selectedCountryGeojsonName ? undefined : selectedStateName,
    selectedPresenceStates,
    stateNames
  );
  const caPaint = buildPaintExpressions(
    selectedCountryGeojsonName,
    selectedPresenceStatesGeo,
    stateNamesGeo
  );

  const showLegend = !!selectedStateName || selectedPresenceStates.length > 0;

  if (!MAPBOX_TOKEN) {
    return (
      <div className={cn("relative w-full h-full flex items-center justify-center bg-[#faf8f5]", className)}>
        <div className="max-w-sm text-center px-6">
          <p className="font-sans font-semibold text-[#3d3d30]" style={{ fontSize: 14 }}>
            Falta el token de Mapbox
          </p>
          <p className="font-sans text-[#747780] mt-1" style={{ fontSize: 13 }}>
            Agrega <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> en <code>.env.local</code> con un token de{" "}
            <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="underline">
              account.mapbox.com
            </a>.
          </p>
        </div>
      </div>
    );
  }

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
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={MEXICO_CENTER}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        reuseMaps
        interactiveLayerIds={onStateClick ? ["mx-states-fill", "ca-countries-fill"] : []}
        cursor={hoveredState ? "pointer" : undefined}
        onLoad={handleMapLoad}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredState(null)}
      >
        <Source id="mx-states" type="geojson" data={MEXICO_STATES_URL}>
          <Layer
            id="mx-states-fill"
            type="fill"
            paint={{
              "fill-color":   mxPaint.fillColor,
              "fill-opacity": mxPaint.fillOpacity,
            }}
          />
          <Layer
            id="mx-states-border"
            type="line"
            paint={{
              "line-color":   mxPaint.lineColor,
              "line-width":   0.75,
              "line-opacity": mxPaint.lineOpacity,
            }}
          />
        </Source>

        <Source id="ca-countries" type="geojson" data={WORLD_COUNTRIES_URL}>
          <Layer
            id="ca-countries-fill"
            type="fill"
            filter={["in", ["get", "name"], ["literal", CENTRAL_AMERICA_GEOJSON_NAMES]]}
            paint={{
              "fill-color":   caPaint.fillColor,
              "fill-opacity": caPaint.fillOpacity,
            }}
          />
          <Layer
            id="ca-countries-border"
            type="line"
            filter={["in", ["get", "name"], ["literal", CENTRAL_AMERICA_GEOJSON_NAMES]]}
            paint={{
              "line-color":   caPaint.lineColor,
              "line-width":   0.75,
              "line-opacity": caPaint.lineOpacity,
            }}
          />
        </Source>

        <NavigationControl position="bottom-right" showCompass={false} />
      </Map>
    </div>
  );
}
