"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../utils/consent";
import { push, trackAppRouter } from "@socialgouv/matomo-next";

type MatomoComponentProps = {
  heatmapEnabled: boolean;
};

function MatomoComponent({ heatmapEnabled }: MatomoComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initializeMatomo = () => {
    const consent = getStoredConsent();

    trackAppRouter({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      pathname,
      searchParams,
      excludeUrlsPatterns: [WIDGETS_PATH],

      // 👉 On se base sur le consentement pour configurer Matomo
      enableHeatmapSessionRecording: heatmapEnabled && consent.matomoHeatmap,
      enableHeartBeatTimer: heatmapEnabled && consent.matomo,

      heatmapConfig: {
        captureKeystrokes: false,
      },

      searchKeyword: "query",

      onInitialization: () => {
        const referrerUrl = document?.referrer || searchParams.get("src_url");

        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }

        if (pathname && pathname.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
    });
  };

  useEffect(() => {
    // Initialisation à l’arrivée sur la page
    initializeMatomo();

    // Réinitialisation Matomo lorsque le consentement change
    const onConsentUpdated = () => {
      initializeMatomo();
    };

    window.addEventListener("cdtn:consent-updated", onConsentUpdated);

    return () => {
      window.removeEventListener("cdtn:consent-updated", onConsentUpdated);
    };
  }, [pathname, searchParams, heatmapEnabled]);

  return null;
}

export const MatomoAnalytics = (props: MatomoComponentProps) => (
  <Suspense fallback={null}>
    <MatomoComponent {...props} />
  </Suspense>
);
