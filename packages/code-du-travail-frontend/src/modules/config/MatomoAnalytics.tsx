"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../utils/consent";
import init, { push } from "@socialgouv/matomo-next";
import { getSourceUrlFromPath } from "../utils/url";

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

    const consent = getStoredConsent();
    console.log("Consent for Matomo Heatmap:", consent.matomoHeatmap);

    if (consent.matomoHeatmap) {
      // Charger tracker.min.js explicitement
      const script = document.createElement("script");
      script.src = `${PIWIK_URL}/plugins/HeatmapSessionRecording/tracker.min.js`;
      script.async = true;
      script.onload = () => {
        console.log("HeatmapSessionRecording tracker.min.js loaded");
        // Ajouter un espion pour vérifier les requêtes
        push(["HeatmapSessionRecording::debug", "true"]);
      };
      script.onerror = () => {
        console.error("Failed to load HeatmapSessionRecording tracker.min.js");
      };
      document.head.appendChild(script);

      const handleLoad = () => {
        console.log("Activating Matomo Heatmap in DSFR version");
        push(["HeatmapSessionRecording.setKeystrokes", "false"]);
        console.log("Keystrokes disabled");
        push(["HeatmapSessionRecording.setCaptureVisibleContentOnly", "false"]);
        console.log("Capture full page enabled");
        push(["HeatmapSessionRecording::enable"]);
        console.log(
          "HeatmapSessionRecording enabled at",
          new Date().toISOString()
        );
      };
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        document.head.removeChild(script);
      };
    }

    if (consent.matomo) {
      push(["enableHeartBeatTimer"]);
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
  <Suspense fallback={null}>
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
