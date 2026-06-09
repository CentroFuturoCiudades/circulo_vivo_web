"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source, type MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";

// ── Constants ──────────────────────────────────────────────

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const MEXICO_CENTER = { longitude: -102.5, latitude: 23.6, zoom: 5 };

// GeoJSON with Mexico state boundaries — property "name" = full Spanish state name
const MEXICO_STATES_URL =
  "https://raw.githubusercontent.com/angelnmara/geojson/master/mexicoHigh.json";

// Project palette — teal, crimson, gold, secondary-blue, purple
const STATE_PALETTE = ["#708b8d", "#852038", "#a8a46c", "#5380b9", "#7a3a78"];

// ── Types ──────────────────────────────────────────────────

export interface InitiativeMarker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  /** GeoJSON state name this marker belongs to (e.g. "Ciudad de México") */
  stateName?: string;
  /** Hex color for the dot. Defaults to teal #708b8d */
  color?: string;
}

export interface InteractiveMapProps {
  markers?: InitiativeMarker[];
  selectedId?: string;
  onMarkerClick?: (id: string) => void;
  /** State names (GeoJSON `name` property) to fill with a light teal overlay */
  stateNames?: string[];
  /** State name of the currently selected initiative — rendered at stronger opacity */
  selectedStateName?: string;
  className?: string;
}

// ── Marker dot ─────────────────────────────────────────────

interface DotProps {
  color: string;
  selected: boolean;
  hovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function MarkerDot({ color, selected, hovered, onClick, onMouseEnter, onMouseLeave }: DotProps) {
  const scale = selected ? 1.5 : hovered ? 1.2 : 1;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Ver iniciativa"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: 24, height: 24 }}
    >
      {selected && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: color, opacity: 0.25 }}
        />
      )}
      {(selected || hovered) && (
        <span
          className="absolute rounded-full transition-all duration-150"
          style={{ width: 20, height: 20, border: `2px solid ${color}`, opacity: selected ? 0.45 : 0.3 }}
        />
      )}
      <span
        className="rounded-full border-2 border-white transition-transform duration-150"
        style={{
          width: 12,
          height: 12,
          backgroundColor: color,
          boxShadow: "0 1px 4px rgba(0,0,0,0.28)",
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}

// ── Component ──────────────────────────────────────────────

export function InteractiveMap({
  markers = [],
  selectedId,
  onMarkerClick,
  stateNames = [],
  selectedStateName,
  className,
}: InteractiveMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const mapRef = useRef<MapRef>(null);
  const markersRef = useRef(markers);
  useLayoutEffect(() => { markersRef.current = markers; });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!selectedId) {
      map.flyTo({ center: [MEXICO_CENTER.longitude, MEXICO_CENTER.latitude], zoom: MEXICO_CENTER.zoom, duration: 700, essential: true });
      return;
    }

    const selected = markersRef.current.find((m) => m.id === selectedId);
    if (!selected) return;

    const peers = selected.stateName
      ? markersRef.current.filter((m) => m.stateName === selected.stateName)
      : [selected];

    if (peers.length > 1) {
      const lngs = peers.map((m) => m.lng);
      const lats = peers.map((m) => m.lat);
      map.fitBounds(
        [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
        { padding: 100, maxZoom: 9, duration: 700, essential: true }
      );
    } else {
      map.flyTo({ center: [selected.lng, selected.lat], zoom: 8, duration: 700, essential: true });
    }
  }, [selectedId]);

  // Assign a palette color to each active state by insertion order
  const stateColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    stateNames.forEach((name, i) => {
      map[name] = STATE_PALETTE[i % STATE_PALETTE.length];
    });
    return map;
  }, [stateNames]);

  // MapLibre expressions — cast to satisfy strict typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fillColor: any = stateNames.length === 0
    ? "transparent"
    : ["match", ["get", "name"], ...stateNames.flatMap((n) => [n, stateColorMap[n]]), "transparent"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fillOpacity: any = [
    "case",
    ["==", ["get", "name"], selectedStateName ?? "__none__"], 0.32,
    ["in",  ["get", "name"], ["literal", stateNames]],        0.18,
    0,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineOpacity: any = [
    "case",
    ["in", ["get", "name"], ["literal", stateNames]], 0.45,
    0,
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineColor: any = stateNames.length === 0
    ? "transparent"
    : ["match", ["get", "name"], ...stateNames.flatMap((n) => [n, stateColorMap[n]]), "transparent"];

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Map
        ref={mapRef}
        initialViewState={MEXICO_CENTER}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        reuseMaps
      >
        {/* ── State fill layers (below markers) ── */}
        <Source id="mx-states" type="geojson" data={MEXICO_STATES_URL}>
          <Layer
            id="mx-states-fill"
            type="fill"
            paint={{
              "fill-color": fillColor,
              "fill-opacity": fillOpacity,
            }}
          />
          <Layer
            id="mx-states-border"
            type="line"
            paint={{
              "line-color": lineColor,
              "line-width": 0.75,
              "line-opacity": lineOpacity,
            }}
          />
        </Source>

        <NavigationControl position="bottom-right" showCompass={false} />

        {/* ── Markers (above state fills) ── */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="center"
          >
            <MarkerDot
              color={marker.color ?? STATE_PALETTE[0]}
              selected={marker.id === selectedId}
              hovered={marker.id === hoveredId}
              onClick={() => onMarkerClick?.(marker.id)}
              onMouseEnter={() => setHoveredId(marker.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
