"use client";

import { useEffect } from "react";
import { appInsights } from "@/lib/appInsights";

/**
 * Mounted once in the root layout. Fires the initial page view — subsequent
 * route changes are picked up automatically via `enableAutoRouteTracking`.
 * Renders nothing.
 */
export function AppInsightsInit() {
  useEffect(() => {
    appInsights.trackPageView();
  }, []);

  return null;
}
