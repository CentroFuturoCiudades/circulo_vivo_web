"use client";

import { useEffect, useRef } from "react";
import Map, { Layer, Source, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";
import {
  ACTIVE_COLOR,
  CENTRAL_AMERICA_GEOJSON_NAMES,
  COUNTRY_NAME_TO_GEOJSON,
  MAPBOX_TOKEN,
  MAP_STYLE,
  MEXICO_STATES_URL,
  OVERVIEW_BOUNDS,
  WORLD_COUNTRIES_URL,
  tintBasemap,
} from "@/components/molecules/InteractiveMap/InteractiveMap";

const DEFAULT_STATES = [
  "Sonora",
  "Nuevo León",
  "San Luis Potosí",
  "Guanajuato",
  "Querétaro",
  "Ciudad de México",
  "Morelos",
  "Puebla",
  "Chiapas",
  "Yucatán",
  "Guatemala",
];

// Water is washed out so the sea weighs less than the land + initiative states.
const WATER_COLOR = "#e6edf4";
const PADDING = 16;
// On wide screens the card sits on the right (see EcosystemMapSection), so bias
// the fitted bounds toward the left by padding the right side more — otherwise
// the map centers under the card instead of reading as a left-side background.
const LG_BREAKPOINT = 1024;
function fitOptionsFor(width: number) {
  if (width >= LG_BREAKPOINT) {
    return { padding: { top: PADDING, bottom: PADDING, left: PADDING, right: Math.round(width * 0.42) }, duration: 0 as const };
  }
  return { padding: PADDING, duration: 0 as const };
}

export interface RegionMapProps {
  /** Spanish state/country names with initiatives — filled in the brand purple. */
  states?: string[];
  className?: string;
}

/**
 * Decorative, static Mapbox background of the whole region: no labels, no
 * political boundaries, not interactive. States with initiatives are colored.
 */
export function RegionMap({ states = DEFAULT_STATES, className }: RegionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);

  // Keep the whole region framed when the container is resized.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      mapRef.current?.fitBounds(OVERVIEW_BOUNDS, fitOptionsFor(width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleLoad() {
    const map = mapRef.current?.getMap();
    if (!map) return;
    // The ResizeObserver's first callback can fire before the map finishes
    // loading (mapRef.current still null then), so the left bias never
    // applied on first paint — reapply it now that the map is ready.
    if (containerRef.current) {
      map.fitBounds(OVERVIEW_BOUNDS, fitOptionsFor(containerRef.current.clientWidth));
    }
    for (const layer of map.getStyle()?.layers ?? []) {
      // No place names (symbol layers) and no political division lines.
      if (layer.type === "symbol" || /admin|boundary|national-park|landuse-overlay/.test(layer.id)) {
        map.setLayoutProperty(layer.id, "visibility", "none");
      }
    }
    tintBasemap(map);
    for (const id of ["water", "waterway", "water-shadow"]) {
      if (!map.getLayer(id)) continue;
      map.setPaintProperty(id, id === "waterway" ? "line-color" : "fill-color", WATER_COLOR);
      map.setPaintProperty(id, id === "waterway" ? "line-opacity" : "fill-opacity", 1);
    }
  }

  const geoNames = states.map((n) => COUNTRY_NAME_TO_GEOJSON[n]).filter(Boolean);
  const mxNames = states.filter((n) => !COUNTRY_NAME_TO_GEOJSON[n]);
  const fillFor = (names: string[]) =>
    names.length > 0 ? ["case", ["in", ["get", "name"], ["literal", names]], ACTIVE_COLOR, "transparent"] : "transparent";
  const caFilter = ["in", ["get", "name"], ["literal", CENTRAL_AMERICA_GEOJSON_NAMES]];

  if (!MAPBOX_TOKEN) {
    return <div className={cn("absolute inset-0 bg-[#fcfbf7]", className)} aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden="true">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ bounds: OVERVIEW_BOUNDS, fitBoundsOptions: { padding: PADDING } }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        interactive={false}
        projection="mercator"
        onLoad={handleLoad}
      >
        <Source id="region-mx-states" type="geojson" data={MEXICO_STATES_URL}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Layer id="region-mx-fill" type="fill" paint={{ "fill-color": fillFor(mxNames) as any, "fill-opacity": 0.5 }} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Layer id="region-mx-line" type="line" paint={{ "line-color": fillFor(mxNames) as any, "line-width": 1, "line-opacity": 0.7 }} />
        </Source>
        <Source id="region-ca-countries" type="geojson" data={WORLD_COUNTRIES_URL}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Layer id="region-ca-fill" type="fill" filter={caFilter as any} paint={{ "fill-color": fillFor(geoNames) as any, "fill-opacity": 0.5 }} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Layer id="region-ca-line" type="line" filter={caFilter as any} paint={{ "line-color": fillFor(geoNames) as any, "line-width": 1, "line-opacity": 0.7 }} />
        </Source>
      </Map>
    </div>
  );
}
