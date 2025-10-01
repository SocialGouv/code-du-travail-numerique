"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../utils/consent";
import init, { push } from "@socialgouv/matomo-next";

type MatomoComponentProps = {
  hasMatomoHeatmapEnabled: boolean;
  hasHeartBeatTimerEnabled: boolean;
};

function MatomoComponent({
  hasMatomoHeatmapEnabled,
  hasHeartBeatTimerEnabled,
}: MatomoComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const consent = getStoredConsent();

    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      pathname,
      excludeUrlsPatterns: [WIDGETS_PATH],
      enableHeatmapSessionRecording:
        consent.matomoHeatmap && hasMatomoHeatmapEnabled,
      heatmapConfig: {
        captureKeystrokes: false,
        captureVisibleContentOnly: false,
        debug: true,
      },
      enableHeartBeatTimer: consent.matomo && hasHeartBeatTimerEnabled,
      onInitialization: () => {
        const referrerUrl = document?.referrer || searchParams.get("src_url");
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (pathname && pathname.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
      searchParams: searchParams.toString(),
    });
  }, [
    pathname,
    searchParams,
    hasMatomoHeatmapEnabled,
    hasHeartBeatTimerEnabled,
  ]);

  return null;
}

type MatomoAnalyticsProps = {
  hasCookieBannerEnabled: boolean;
};

export const MatomoAnalytics = ({
  hasCookieBannerEnabled,
}: MatomoAnalyticsProps) => (
  <Suspense fallback={null}>
    <MatomoComponent
      hasHeartBeatTimerEnabled={hasCookieBannerEnabled}
      hasMatomoHeatmapEnabled={hasCookieBannerEnabled}
    />
  </Suspense>
);
