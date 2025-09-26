"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../utils/consent";
import init, { push } from "@socialgouv/matomo-next";
import Script from "next/script";

type MatomoComponentProps = {
  hasMatomoHeatmapEnabled: boolean;
  hasHeartBeatTimerEnabled: boolean;
};

function MatomoComponent({
  hasMatomoHeatmapEnabled,
  hasHeartBeatTimerEnabled,
}: MatomoComponentProps) {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString();
  const path = usePathname();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [hasBeenInit, setInit] = useState(false);

  useEffect(() => {
    console.log(`[INIT] TrackPageview(${window.location.pathname})`);
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl = document?.referrer || searchParams.get("src_url");
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (path && path.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });

    setInit(true);
    const consent = getStoredConsent();
    console.log("Consent for Matomo Heatmap:", consent.matomoHeatmap);

    if (consent.matomoHeatmap && hasMatomoHeatmapEnabled) {
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

    if (consent.matomo && hasHeartBeatTimerEnabled) {
      push(["enableHeartBeatTimer"]);
    }
  }, []);

  useEffect(() => {
    console.log(
      "[PATH CHANGE] Has been init: ",
      hasBeenInit,
      `(${previousPath} <-> ${path})`
    );
    if (path && !isExcludedUrl(path, [WIDGETS_PATH])) {
      let [pathname] = path.split("?");
      pathname = pathname.replace(/#.*/, "");

      if (previousPath) {
        push(["setReferrerUrl", `${previousPath}`]);
      }

      push(["setCustomUrl", pathname]);
      push(["deleteCustomVariables", "page"]);
      setPreviousPath(pathname);

      const query = searchParams?.get("query");
      push(["setDocumentTitle", document.title]);

      if (!hasBeenInit || previousPath !== pathname) {
        if (startsWith(path, "/recherche") || startsWith(path, "/search")) {
          console.log("[PATH CHANGE] trackSiteSearch:", pathname, previousPath);
          push(["trackSiteSearch", query ?? ""]);
        } else {
          console.log("[PATH CHANGE] TrackPageview:", pathname, previousPath);
          push(["trackPageView"]);
        }
      } else {
        console.log("[PATH NOT CHANGE] TrackPageview:", pathname, previousPath);
      }
    }
  }, [path, searchParamsString, init]);

  return null;
}

type MatomoAnalyticsProps = {
  hasCookieBannerEnabled: boolean;
};

export const MatomoAnalytics = ({
  hasCookieBannerEnabled,
}: MatomoAnalyticsProps) => (
  <Suspense fallback={null}>
    <Script id="matomo">
      {`
                  var _paq = window._paq = window._paq || [];
                  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                  _paq.push(["setCookieDomain", "*.nosgestesclimat.fr"]);
                  _paq.push(['setCookieSameSite', 'None']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                    var u="${PIWIK_URL}/";
                    _paq.push(['setTrackerUrl', u+'matomo.php']);
                    _paq.push(['setSiteId', '${PIWIK_SITE_ID}']);
                    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                  })();
                `}
    </Script>
    <MatomoComponent
      hasHeartBeatTimerEnabled={hasCookieBannerEnabled}
      hasMatomoHeatmapEnabled={hasCookieBannerEnabled}
    />
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
