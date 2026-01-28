"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  AB_TESTING_ENABLED,
  PIWIK_SITE_ID,
  PIWIK_URL,
  WIDGETS_PATH,
  SITE_URL,
} from "../../config";
import { getStoredConsent } from "../utils/consent";
import { push, trackAppRouter } from "@socialgouv/matomo-next";
import { initABTesting } from "./initABTesting";
import { AB_TESTS } from "./abTests";

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

        initABTesting({
          enabled: AB_TESTING_ENABLED,
          pathname: pathname ?? "",
          excludeUrlsPatterns: [WIDGETS_PATH],
          tests: AB_TESTS,
        });
      },
    });
  };

  useEffect(() => {
    initializeMatomo();

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
