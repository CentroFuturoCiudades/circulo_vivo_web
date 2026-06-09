"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { ChatbotButton } from "@/components/molecules/ChatbotButton";
import { InitiativeList } from "@/components/molecules/InitiativeList";
import { InitiativeDetailCard } from "@/components/molecules/InitiativeDetailCard";
import { InteractiveMap } from "@/components/molecules/InteractiveMap";
import { InitiativeDrawer } from "@/components/organisms/InitiativeDrawer";

// ── Shared initiative type ─────────────────────────────────

type ChipColor = "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";

export interface Initiative {
  id: string;
  // Map marker
  lat: number;
  lng: number;
  markerColor?: string;
  // Shared across list / card / drawer
  title: string;
  chips?: Array<{ label: string; color?: ChipColor }>;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
  /** Full Spanish state name matching the GeoJSON (e.g. "Ciudad de México", "Jalisco") */
  state?: string;
  // Drawer-only
  whatTheyDo?: string[];
}

export interface InitiativesMapProps {
  initiatives?: Initiative[];
  onChatbotClick?: () => void;
  className?: string;
}

// ── Organism ───────────────────────────────────────────────

const ALL = "Todos";

function matchesFilters(chips: Initiative["chips"], filterValues: Record<string, string>): boolean {
  return Object.values(filterValues).every((val) => {
    if (!val || val === ALL) return true;
    return chips?.some((c) => c.label === val) ?? false;
  });
}

export function InitiativesMap({ initiatives = [], onChatbotClick, className }: InitiativesMapProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  // Filtered markers — react to filter changes from the sidebar
  const filteredMarkers = useMemo(() =>
    initiatives
      .filter((i) => matchesFilters(i.chips, filterValues))
      .map((i) => ({
        id: i.id,
        lat: i.lat,
        lng: i.lng,
        title: i.title,
        stateName: i.state,
        color: i.markerColor ?? "#708b8d",
      })),
    [initiatives, filterValues]
  );

  // Unique state names from visible initiatives — drives the fill layer
  const stateNames = useMemo(() => {
    const names = filteredMarkers
      .map((m) => initiatives.find((i) => i.id === m.id)?.state)
      .filter((s): s is string => Boolean(s));
    return [...new Set(names)];
  }, [filteredMarkers, initiatives]);

  // Null out selection when filters hide the selected initiative
  const activeSelectedId = useMemo(
    () => (selectedId && filteredMarkers.some((m) => m.id === selectedId) ? selectedId : undefined),
    [selectedId, filteredMarkers]
  );
  const selected = initiatives.find((i) => i.id === activeSelectedId);
  const effectiveDrawerOpen = drawerOpen && !!activeSelectedId;

  // Active location filter label (Estado) shown as overlay chip on the map
  const activeLocation =
    filterValues["Estado"] && filterValues["Estado"] !== ALL
      ? filterValues["Estado"]
      : null;

  function handleSelect(id: string) {
    setSelectedId(id);
    setDrawerOpen(false);
  }

  function handleCloseCard() {
    setSelectedId(undefined);
    setDrawerOpen(false);
  }

  return (
    // p-8 = 32px padding (from M06p1), gap-8 = 32px gap between panels (from cfICJ layout)
    <div className={cn("flex h-full gap-8 p-8 overflow-hidden", className)}>

      {/* ── Sidebar — list (flex-1) + chatbot button, gap-6 matches design gap:24 ── */}
      <div className="flex flex-col gap-6 shrink-0 h-full" style={{ width: 280 }}>
        <InitiativeList
          items={initiatives}
          selectedId={activeSelectedId}
          onSelect={handleSelect}
          onFilterChange={setFilterValues}
          className="flex-1 min-h-0"
        />
        <ChatbotButton onClick={onChatbotClick} />
      </div>

      {/* ── Map panel — #faf8f5 solid cream, rounded-xl, border #c4c7c7, clips overflow ── */}
      <div className="relative flex-1 h-full rounded-xl bg-[#faf8f5] border border-[#c4c7c7] overflow-hidden">

        {/* Active location filter chip — top-left of map */}
        <AnimatePresence>
          {activeLocation && (
            <motion.div
              key={activeLocation}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-4 left-4 z-10"
            >
              <Chip
                color="neutral"
                className="bg-[#f0ede4] text-[#3d3d30] border border-[#dedad2] hover:bg-[#e8e4da] cursor-default uppercase tracking-[0.08em] text-[11px] font-semibold"
              >
                Explorando: {activeLocation}
              </Chip>
            </motion.div>
          )}
        </AnimatePresence>

        <InteractiveMap
          markers={filteredMarkers}
          selectedId={activeSelectedId}
          onMarkerClick={handleSelect}
          stateNames={stateNames}
          selectedStateName={selected?.state}
          className="w-full h-full"
        />

        <AnimatePresence mode="wait">
          {selected && !effectiveDrawerOpen && (
            <InitiativeDetailCard
              key={selected.id}
              title={selected.title}
              description={selected.description}
              chips={selected.chips}
              imageUrl={selected.imageUrl}
              websiteUrl={selected.websiteUrl}
              onClose={handleCloseCard}
              onProfileClick={() => setDrawerOpen(true)}
              className="absolute top-6 right-6 z-10"
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {selected && effectiveDrawerOpen && (
          <InitiativeDrawer
            key={selected.id}
            open
            title={selected.title}
            chips={selected.chips}
            imageUrl={selected.imageUrl}
            description={selected.description}
            whatTheyDo={selected.whatTheyDo}
            websiteUrl={selected.websiteUrl}
            onClose={() => setDrawerOpen(false)}
            className="h-full shrink-0"
          />
        )}
      </AnimatePresence>

    </div>
  );
}
