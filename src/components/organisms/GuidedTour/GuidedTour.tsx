"use client";

import { useEffect, useRef } from "react";
import { Joyride, STATUS, type EventData, type Step } from "react-joyride";
import { useTourStore, type TourId } from "@/stores/useTourStore";
import { TourTooltip } from "./TourTooltip";

export interface GuidedTourStep {
  /** CSS selector for the element to spotlight. Omit (or use "body") for a centered, non-spotlit closing step. */
  target: string;
  title: string;
  content: React.ReactNode;
  /** Override react-joyride's "auto" placement — useful when the target is large and auto-placement lands the tooltip over other important UI (e.g. a sidebar). */
  placement?: Step["placement"];
  /**
   * When the spotlighted element is too large for the tooltip to be
   * positioned against it without running out of viewport space, point
   * `target` at a small, stably-placed anchor instead and set this to the
   * selector that should actually get the spotlight cutout.
   */
  spotlightTarget?: string;
}

export interface GuidedTourProps {
  tourId: TourId;
  steps: GuidedTourStep[];
}

const OVERLAY_COLOR = "rgba(26,28,28,0.55)";
const SPOTLIGHT_PADDING = 10;

// react-joyride's buttons default to English aria-label/title (Next, Back, Skip,
// Close) regardless of the visible label our TourTooltip renders — override them
// so assistive tech announces the same Spanish copy a sighted user sees.
const LOCALE = {
  back: "Atrás",
  close: "Cerrar",
  last: "Entendido",
  next: "Siguiente",
  skip: "Saltar tutorial",
};

function toJoyrideSteps(steps: GuidedTourStep[]): Step[] {
  return steps.map((s) => ({
    target: s.target,
    spotlightTarget: s.spotlightTarget,
    title: s.title,
    content: s.content,
    placement: s.target === "body" ? "center" : (s.placement ?? "auto"),
    skipBeacon: true,
    spotlightPadding: SPOTLIGHT_PADDING,
  }));
}

/**
 * Spotlight-style guided tour for a page (map or chatbot). Auto-runs once per
 * visitor (tracked in useTourStore + localStorage) and can be replayed at any
 * time by calling `useTourStore.getState().startTour(tourId)` — e.g. from an
 * "info" button elsewhere on the page.
 */
export function GuidedTour({ tourId, steps }: GuidedTourProps) {
  const hydrated = useTourStore((s) => s.hydrated);
  const seen = useTourStore((s) => s.seen[tourId]);
  const activeTour = useTourStore((s) => s.activeTour);
  const hydrate = useTourStore((s) => s.hydrate);
  const markSeen = useTourStore((s) => s.markSeen);
  const startTour = useTourStore((s) => s.startTour);
  const endTour = useTourStore((s) => s.endTour);

  const autoStarted = useRef(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // First-visit auto-start — only once per mount, only once we know whether it's really unseen.
  useEffect(() => {
    if (!hydrated || autoStarted.current || seen) return;
    autoStarted.current = true;
    startTour(tourId);
  }, [hydrated, seen, tourId, startTour]);

  function handleEvent(data: EventData) {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      markSeen(tourId);
      endTour();
    }
  }

  if (!hydrated) return null;

  return (
    <Joyride
      run={activeTour === tourId}
      steps={toJoyrideSteps(steps)}
      continuous
      scrollToFirstStep
      tooltipComponent={TourTooltip}
      floatingOptions={{ hideArrow: true }}
      locale={LOCALE}
      options={{
        overlayColor: OVERLAY_COLOR,
        zIndex: 10000,
        spotlightRadius: 12,
        // The tooltip's own "X" should end the whole tour, not just close this step.
        closeButtonAction: "skip",
      }}
      onEvent={handleEvent}
    />
  );
}
