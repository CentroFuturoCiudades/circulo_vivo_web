import { ApplicationInsights } from "@microsoft/applicationinsights-web";

/**
 * Client-side Application Insights instance — web analytics (page views, clicks,
 * custom events). Requires `NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING`; when unset
 * (e.g. local dev without a connection string) telemetry is a no-op rather than
 * throwing, so this is safe to import unconditionally.
 *
 * `enableAutoRouteTracking` is required for Next.js: without it, only the initial
 * document load fires a page view — client-side route changes never would.
 */
const connectionString = process.env.NEXT_PUBLIC_APPINSIGHTS_CONNECTION_STRING;

export const appInsights = new ApplicationInsights({
  config: {
    connectionString,
    enableAutoRouteTracking: true,
    autoTrackPageVisitTime: true,
  },
});

if (connectionString) {
  appInsights.loadAppInsights();
}
