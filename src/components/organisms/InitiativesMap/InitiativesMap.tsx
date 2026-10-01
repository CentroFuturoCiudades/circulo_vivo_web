"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/atoms/Chip";
import { ChatbotButton } from "@/components/molecules/ChatbotButton";
import { InitiativeList } from "@/components/molecules/InitiativeList";
import { InteractiveMap } from "@/components/molecules/InteractiveMap";
import { InitiativeDrawer } from "@/components/organisms/InitiativeDrawer";
import { useIsMobile } from "@/lib/useIsMobile";

// ── Shared initiative type ─────────────────────────────────

type ChipColor = "teal" | "crimson" | "gold" | "secondary" | "neutral" | "purple";

export interface Initiative {
  id: string;
  // Shared across list / card / drawer
  title: string;
  chips?: Array<{ label: string; color?: ChipColor }>;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
  /** Pre-formatted "City, State" location string */
  location?: string;
  /** Full Spanish state name of the sede (HQ) */
  state?: string;
  /** Other states where this initiative has presence */
  presenceStates?: string[];
  // Drawer-only
  whatTheyDo?: string[];
}

export interface InitiativesMapProps {
  initiatives?: Initiative[];
  /** Rendered in the top-right corner of the map panel (stays inside the map, never over the drawer). */
  mapCornerAction?: React.ReactNode;
  onChatbotClick?: () => void;
  className?: string;
}

// ── Organism ───────────────────────────────────────────────

const ALL = "Todos";

function matchesFilters(chips: Initiative["chips"], filterValues: Record<string, string>): boolean {
  return Object.values(filterValues).every((val) => {
    if (!val || val === ALL) return true;
    return chips?.some((c) => c?.label === val) ?? false;
  });
}

export function InitiativesMap({ initiatives: rawInitiatives = [], mapCornerAction, onChatbotClick, className }: InitiativesMapProps) {
  const initiatives = (rawInitiatives ?? []).filter((i) => i?.id);
  const [selectedId, setSelectedId]     = useState<string | undefined>();
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [mapSelectedState, setMapSelectedState] = useState<string | undefined>();
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const isMobile = useIsMobile();

  // Filtered initiatives — react to the sidebar list's location filter
  const filteredInitiatives = useMemo(
    () => initiatives.filter((i) => matchesFilters(i.chips, filterValues)),
    [initiatives, filterValues]
  );

  // Unique sede-state names from visible initiatives — drives overview fill layer
  const stateNames = useMemo(() => {
    const names = filteredInitiatives
      .map((i) => i.state)
      .filter((s): s is string => Boolean(s));
    return [...new Set(names)];
  }, [filteredInitiatives]);

  // When the filter bar hides the selected initiative, drop the selection *and*
  // the map-driven state filter with it. Otherwise the leftover state filter
  // stacks on top of the new filters and the list/map end up empty.
  const selectionLost =
    selectedId !== undefined && !initiatives.some((i) => i.id === selectedId);
  if (selectionLost) {
    setSelectedId(undefined);
    setMapSelectedState("");
  }

  const activeSelectedId = selectionLost ? undefined : selectedId;
  const selected = initiatives.find((i) => i.id === activeSelectedId);

  // Active location filter label (Estado) shown as overlay chip on the map
  const activeLocation =
    filterValues["Estado"] && filterValues["Estado"] !== ALL
      ? filterValues["Estado"]
      : null;

  function handleSelect(id: string) {
    setSelectedId(id);
    // On mobile, collapse the sheet so the map + drawer become visible.
    setSheetExpanded(false);
  }

  function handleCloseDrawer() {
    setSelectedId(undefined);
    setMapSelectedState("");
  }

  // Prev/next walk exactly the listing that is currently shown (filter bar +
  // any state picked on the map), wrapping around. They never change a filter.
  const activeIndex = filteredInitiatives.findIndex((i) => i.id === activeSelectedId);
  const canNavigate = activeIndex >= 0 && filteredInitiatives.length > 1;
  const goToOffset = useCallback(
    (delta: number) => {
      if (!canNavigate) return;
      const count = filteredInitiatives.length;
      setSelectedId(filteredInitiatives[(activeIndex + delta + count) % count].id);
    },
    [canNavigate, activeIndex, filteredInitiatives]
  );

  // ←/→ move between initiatives while the drawer is open (ignored while typing in a field).
  useEffect(() => {
    if (!canNavigate) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
      e.preventDefault();
      goToOffset(e.key === "ArrowRight" ? 1 : -1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [canNavigate, goToOffset]);

  function handleFilterChange(values: Record<string, string>) {
    setFilterValues(values);
    // If the Estado filter changed from somewhere other than the map, release map control
    if (mapSelectedState !== undefined && values["Estado"] !== mapSelectedState) {
      setMapSelectedState(undefined);
    }
  }

  function handleMapStateClick(stateName: string) {
    const isDeselecting = mapSelectedState === stateName;
    setMapSelectedState(isDeselecting ? "" : stateName);

    if (isDeselecting) {
      setSelectedId(undefined);
    } else {
      // Auto-select the first visible initiative in the clicked state
      const first = initiatives.find(
        (i) => i.state === stateName && matchesFilters(i.chips, filterValues)
      );
      setSelectedId(first?.id);
    }
  }

  const drawerProps = selected
    ? {
        open: true,
        title: selected.title,
        chips: selected.chips,
        imageUrl: selected.imageUrl,
        description: selected.description,
        whatTheyDo: selected.whatTheyDo,
        websiteUrl: selected.websiteUrl,
        location: selected.location,
        onClose: handleCloseDrawer,
        onPrev: canNavigate ? () => goToOffset(-1) : undefined,
        onNext: canNavigate ? () => goToOffset(1) : undefined,
      }
    : null;

  return (
    // Mobile/tablet: the map is edge-to-edge and primary (Google-Maps-style); the list
    // becomes a bottom sheet the user can peek/expand, instead of pushing the map off-screen.
    // Desktop (lg+): unchanged — sidebar + map side by side, exactly as before.
    <div className={cn("relative flex h-full lg:gap-8 lg:p-8 overflow-hidden", className)}>

      {/* ── Sidebar (inline on desktop, bottom sheet on mobile) ── */}
      <div
        data-tour="map-list"
        className={cn(
          // z-30: sits above the map's corner info button (z-20) so the expanded sheet fully covers it instead of colliding with its own header on small screens.
          "absolute inset-x-0 bottom-0 z-30 flex flex-col rounded-t-2xl border-t border-[#c4c7c7] bg-[#faf8f5] shadow-[0_-4px_24px_rgba(0,0,0,0.15)] transition-[height] duration-300 ease-in-out overflow-hidden",
          sheetExpanded ? "h-[75vh]" : "h-[104px]",
          "lg:static lg:inset-auto lg:z-auto lg:h-full lg:w-[280px] lg:shrink-0 lg:gap-6 lg:rounded-none lg:border-t-0 lg:bg-transparent lg:shadow-none lg:transition-none lg:overflow-visible"
        )}
      >
        {/* Drag handle — mobile/tablet only, toggles expand/collapse */}
        <button
          type="button"
          onClick={() => setSheetExpanded((v) => !v)}
          aria-label={sheetExpanded ? "Contraer lista" : "Expandir lista"}
          className="lg:hidden flex flex-col items-center gap-1 shrink-0 pt-2.5 pb-1"
        >
          <span className="w-10 h-1 rounded-full bg-[#c4c7c7]" />
          <ChevronUp
            size={14}
            className={cn("text-[#9ca3af] transition-transform", sheetExpanded && "rotate-180")}
          />
        </button>

        {/* Collapsed summary — mobile/tablet only, tap to expand */}
        {!sheetExpanded && (
          <button
            type="button"
            onClick={() => setSheetExpanded(true)}
            className="lg:hidden flex items-center justify-between px-4 pb-4"
          >
            <span className="font-sans font-bold text-[#211f19]" style={{ fontSize: 16 }}>
              {initiatives.length} iniciativas
            </span>
            <span className="font-sans text-[#708b8d]" style={{ fontSize: 13 }}>
              Ver lista
            </span>
          </button>
        )}

        {/* Full list + chatbot CTA — always on desktop, mobile only while expanded */}
        <div
          className={cn(
            "min-h-0 flex-col gap-6",
            sheetExpanded ? "flex flex-1" : "hidden",
            "lg:flex lg:flex-1"
          )}
        >
          <InitiativeList
            items={initiatives}
            selectedId={activeSelectedId}
            onSelect={handleSelect}
            onFilterChange={handleFilterChange}
            selectedState={mapSelectedState}
            className="flex-1 min-h-0 mx-4 lg:mx-0"
          />
          <ChatbotButton href={onChatbotClick ? undefined : "/chatbot"} onClick={onChatbotClick} className="shrink-0 mx-4 mb-4 lg:mx-0 lg:mb-0 hidden lg:flex" />
        </div>
      </div>

      {/* ── Map panel (full-bleed on mobile, framed panel on desktop) ── */}
      <div data-tour="map-canvas" className="relative flex-1 h-full lg:rounded-xl bg-[#faf8f5] lg:border lg:border-[#c4c7c7] overflow-hidden">

        {/* Small, stably-placed anchor for the guided tour's tooltip — the map panel
            itself is too large/edge-to-edge for react-joyride to position a tooltip
            against without running out of viewport space (see GuidedTourStep.spotlightTarget). */}
        <div data-tour="map-canvas-anchor" className="absolute top-8 left-1/2 w-px h-px pointer-events-none" />

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
          stateNames={selected ? [] : stateNames}
          selectedStateName={selected?.state}
          selectedPresenceStates={selected?.presenceStates}
          onStateClick={handleMapStateClick}
          keyboard={!selected}
          className="w-full h-full"
        />

        {mapCornerAction && <div className="absolute top-4 right-4 z-20">{mapCornerAction}</div>}
      </div>

      {/* ── Drawer ──
          On mobile this is rendered via a portal into document.body: the map area's own
          ancestor (`z-10` + `position: relative` in the page) creates a local stacking
          context, so a merely-high z-index here could never actually render above the
          page's nav/search bar — only escaping via portal guarantees a true full-screen
          takeover. Desktop is unaffected — it stays inline, exactly as before.
          Note: the portal wraps its own AnimatePresence rather than being nested inside
          one — AnimatePresence relies on React.isValidElement for its direct children,
          which is false for the object createPortal() returns, silently breaking it. */}
      {isMobile && typeof document !== "undefined" ? (
        createPortal(
          <AnimatePresence>
            {drawerProps && (
              <InitiativeDrawer
                key="drawer"
                {...drawerProps}
                width="100%"
                className="fixed inset-0 z-[100] w-full h-full"
                innerClassName="rounded-none border-0"
              />
            )}
          </AnimatePresence>,
          document.body
        )
      ) : (
        <AnimatePresence>
          {drawerProps && (
            <InitiativeDrawer
              key="drawer"
              {...drawerProps}
              width={319}
              className="h-full shrink-0"
            />
          )}
        </AnimatePresence>
      )}

    </div>
  );
}
