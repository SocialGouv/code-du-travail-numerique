"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL, WIDGETS_PATH } from "../../config";
import { getSourceUrlFromPath } from "../../lib";
import init, { push } from "./MatomoNext";
import { getStoredConsent } from "../../lib/consent";

function MatomoComponent() {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString();
  const path = usePathname();
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl =
          document?.referrer || getSourceUrlFromPath(SITE_URL + path);
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (path && path.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });

    // Vérifier le consentement
    const consent = getStoredConsent();

    // Activation des fonctionnalités de base si l'utilisateur a donné son consentement pour Matomo
    if (consent.matomo) {
      push(["enableHeartBeatTimer"]);
    }

    // Activer la carte des chaleurs si l'utilisateur a donné son consentement
    if (consent.matomoHeatmap) {
      console.log("Activating Matomo Heatmap in DSFR version");

      // Configuration de la carte des chaleurs
      push(["HeatmapSessionRecording.setRecordingEnvironment", "production"]);
      push(["HeatmapSessionRecording.setKeystrokes", "false"]); // Don't record keystrokes for privacy
      push(["HeatmapSessionRecording.setCaptureVisibleContentOnly", "false"]); // Capture full page for heatmaps
      push(["HeatmapSessionRecording.enable"]);

      // Événement spécifique pour la carte des chaleurs
      push([
        "trackEvent",
        "Heatmap_Test",
        "Page_Visit",
        window.location.pathname,
      ]);
    }
  }, []);

  useEffect(() => {
    if (path && !isExcludedUrl(path, [WIDGETS_PATH])) {
      let [pathname] = path.split("?");
      pathname = pathname.replace(/#.*/, "");

      if (previousPath) {
        push(["setReferrerUrl", `${previousPath}`]);
      }

      push(["setCustomUrl", pathname]);
      push(["deleteCustomVariables", "page"]);
      setPreviousPath(pathname);

      const query = searchParams?.get("q");
      push(["setDocumentTitle", document.title]);
      if (startsWith(path, "/recherche") || startsWith(path, "/search")) {
        push(["trackSiteSearch", query ?? ""]);
      } else {
        push(["trackPageView"]);
      }
    }
  }, [path, searchParamsString]);
  return null;
}

export const MatomoAnalytics = () => (
  <Suspense>
    <MatomoComponent />
  </Suspense>
);

const startsWith = (str: string, needle: string) => {
  return str.substring(0, needle.length) === needle;
};

const isExcludedUrl = (url: string, patterns: RegExp[]): boolean => {
  let excluded = false;
  patterns.forEach((pattern) => {
    if (pattern.exec(url) !== null) {
      excluded = true;
    }
  });
  return excluded;
};
