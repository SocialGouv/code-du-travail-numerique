"use client";

import { init, push } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL, WIDGETS_PATH } from "../../config";
import { getSourceUrlFromPath } from "../../lib";

export function MatomoAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl =
          document?.referrer || getSourceUrlFromPath(SITE_URL + pathname);
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (pathname && pathname.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });
  }, []);

  return null;
}
