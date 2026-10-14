"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Map, { Layer, Source, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  CENTRAL_AMERICA_GEOJSON_NAMES,
  COUNTRY_NAME_TO_GEOJSON,
  MAPBOX_TOKEN,
  MAP_STYLE,
  MEXICO_STATES_URL,
  WORLD_COUNTRIES_URL,
  boundsForFeature,
  loadMxStatesGeojson,
  loadWorldCountriesGeojson,
  tintBasemap,
} from "@/components/molecules/InteractiveMap/InteractiveMap";

// Wider than InteractiveMap's OVERVIEW_BOUNDS — this is a decorative, zoomed-out
// background, so it needs extra southern margin to keep all of Central America
// comfortably in frame instead of cropped at the container's bottom edge.
const REGION_OVERVIEW_BOUNDS: [[number, number], [number, number]] = [[-118, 9.5], [-85, 33.5]];

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

// Matches the EcosystemMapSection CTA card so the highlighted states read as
// part of the same visual family instead of a disconnected brand purple.
const WINE_COLOR = "#561427";

// Water is washed out so the sea weighs less than the land + initiative states.
const WATER_COLOR = "#e6edf4";
const PADDING = 16;
// On wide screens the card sits on the right (see EcosystemMapSection), so bias
// the fitted bounds toward the left by padding the right side more — otherwise
// the map centers under the card instead of reading as a left-side background.
// Kept modest so Central America still fits fully in frame (not cropped).
const LG_BREAKPOINT = 1024;
function fitOptionsFor(width: number, extra?: { duration: number }) {
  const duration = extra?.duration ?? 0;
  if (width >= LG_BREAKPOINT) {
    return { padding: { top: PADDING, bottom: PADDING, left: PADDING, right: Math.round(width * 0.22) }, duration };
  }
  return { padding: PADDING, duration };
}

function useIsElementVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

const ZOOM_IN_MS = 1800;
const HOLD_MS = 1600;
const ZOOM_OUT_MS = 1400;
const OVERVIEW_HOLD_MS = 1200;

export interface RegionMapProps {
  /** Spanish state/country names with initiatives — filled in. */
  states?: string[];
  className?: string;
  /** Cycles a slow zoom-in/zoom-out on each state with initiatives. Off by default. */
  animate?: boolean;
}

/**
 * Decorative, static Mapbox background of the whole region: no labels, no
 * political boundaries, not interactive. States with initiatives are colored.
 */
export function RegionMap({ states = DEFAULT_STATES, className, animate = false }: RegionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Keep the whole region framed when the container is resized.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.clientWidth;
      mapRef.current?.fitBounds(REGION_OVERVIEW_BOUNDS, fitOptionsFor(width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Only animate while the map is actually on screen — the zoom transitions
  // redraw a fairly heavy set of polygons every frame, so cycling them while
  // scrolled out of view would just burn CPU/battery for nothing.
  const isVisible = useIsElementVisible(containerRef);

  // Cycles a gentle zoom-in on each state with an initiative, then back out to
  // the overview, pausing at each. Disabled when out of view, the tab is
  // hidden, or the visitor prefers reduced motion — it just sits on the
  // static overview instead.
  useEffect(() => {
    if (!animate || reducedMotion || !isVisible) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timeouts.push(setTimeout(resolve, ms)));

    async function run() {
      const [mxData, worldData] = await Promise.all([loadMxStatesGeojson(), loadWorldCountriesGeojson()]);
      if (cancelled) return;
      const targets = states
        .map((name) => {
          const geoName = COUNTRY_NAME_TO_GEOJSON[name];
          const bounds = geoName ? boundsForFeature(worldData, geoName) : boundsForFeature(mxData, name);
          return bounds ? { name, bounds } : null;
        })
        .filter((t): t is { name: string; bounds: [[number, number], [number, number]] } => Boolean(t));

      if (!targets.length) return;

      while (!cancelled) {
        for (const target of targets) {
          if (cancelled) return;
          if (document.visibilityState === "hidden") {
            await wait(400);
            continue;
          }
          const map = mapRef.current?.getMap();
          const width = containerRef.current?.clientWidth ?? 0;
          if (map) {
            map.fitBounds(target.bounds, { padding: 60, duration: ZOOM_IN_MS, essential: false });
            await wait(ZOOM_IN_MS + HOLD_MS);
            if (cancelled) return;
            map.fitBounds(REGION_OVERVIEW_BOUNDS, fitOptionsFor(width, { duration: ZOOM_OUT_MS }));
            await wait(ZOOM_OUT_MS + OVERVIEW_HOLD_MS);
          }
        }
      }
    }

    run();
    const mapNode = mapRef.current;
    const containerNode = containerRef.current;
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      // Settle back on the static overview instead of freezing mid-zoom.
      if (containerNode) {
        mapNode?.getMap()?.fitBounds(REGION_OVERVIEW_BOUNDS, fitOptionsFor(containerNode.clientWidth));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, reducedMotion, isVisible, states.join("|")]);

  function handleLoad() {
    const map = mapRef.current?.getMap();
    if (!map) return;
    // The ResizeObserver's first callback can fire before the map finishes
    // loading (mapRef.current still null then), so the left bias never
    // applied on first paint — reapply it now that the map is ready.
    if (containerRef.current) {
      map.fitBounds(REGION_OVERVIEW_BOUNDS, fitOptionsFor(containerRef.current.clientWidth));
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
    names.length > 0 ? ["case", ["in", ["get", "name"], ["literal", names]], WINE_COLOR, "transparent"] : "transparent";
  const caFilter = ["in", ["get", "name"], ["literal", CENTRAL_AMERICA_GEOJSON_NAMES]];

  if (!MAPBOX_TOKEN) {
    return <div className={cn("absolute inset-0 bg-[#fcfbf7]", className)} aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden="true">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ bounds: REGION_OVERVIEW_BOUNDS, fitBoundsOptions: { padding: PADDING } }}
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
