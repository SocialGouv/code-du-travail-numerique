import "katex/dist/katex.min.css";
import "react-image-lightbox/style.css";

import * as Sentry from "@sentry/nextjs";
import { GlobalStyles, ThemeProvider } from "@socialgouv/cdtn-ui";
import { AppProps } from "next/app";
import { init, push } from "@socialgouv/matomo-next";
import React, { useEffect } from "react";

// Déclaration de type pour window.Piwik
declare global {
  interface Window {
    Piwik?: {
      HeatmapSessionRecording?: any;
    };
  }
}

import { A11y } from "../src/a11y";
import { getSourceUrlFromPath } from "../src/lib";
import { useRouter } from "next/router";
import CookieConsentLegacy from "../src/components/CookieConsent/index";
import { initConsent } from "../src/lib/consent";
import {
  PIWIK_SITE_ID,
  PIWIK_URL,
  SITE_URL,
  WIDGETS_PATH,
} from "../src/config";

if (typeof window !== "undefined") {
  import("../src/web-components/tooltip")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip",
        module.WebComponentsTooltip
      );
    })
    .catch((err) => {
      Sentry.captureException(err);
    });
  import("../src/web-components/tooltip-cc")
    .then((module) => {
      customElements.define(
        "webcomponent-tooltip-cc",
        module.WebComponentsTooltipCC
      );
    })
    .catch((err) => {
      Sentry.captureException(err);
    });
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // Initialize consent
    initConsent();

    // Initialize Matomo
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        const referrerUrl =
          document?.referrer || getSourceUrlFromPath(SITE_URL + router.asPath);
        if (referrerUrl) {
          push(["setReferrerUrl", referrerUrl]);
        }
        if (router.pathname.match(WIDGETS_PATH)) {
          push(["setCookieSameSite", "None"]);
        }
        // Activation de la carte des chaleurs (heatmap) pour Matomo 5.2.2
        push(["enableHeartBeatTimer"]);
        push(["enableLinkTracking"]);

        // Activation spécifique pour le plugin Heatmap & Session Recording
        push(["HeatmapSessionRecording.enable"]);

        // Activer le mode debug de Matomo (affiche les événements dans la console)
        if (process.env.NODE_ENV !== "production") {
          push(["setDebugMode", "true"]);
          console.log("Matomo debug mode activé");
        }

        // Événement de test pour vérifier la communication avec Matomo
        push([
          "trackEvent",
          "Heatmap_Test",
          "Page_Visit",
          window.location.pathname,
        ]);
        console.log(
          "Événement de test Matomo envoyé pour la page:",
          window.location.pathname
        );

        // Débogage spécifique pour les heatmaps
        if (
          typeof window !== "undefined" &&
          window.Piwik &&
          window.Piwik.HeatmapSessionRecording
        ) {
          console.log(
            "Configuration HeatmapSessionRecording:",
            window.Piwik.HeatmapSessionRecording
          );
        } else {
          console.log(
            "Piwik.HeatmapSessionRecording n'est pas disponible immédiatement"
          );
          // Vérifier après un délai
          setTimeout(() => {
            if (
              typeof window !== "undefined" &&
              window.Piwik &&
              window.Piwik.HeatmapSessionRecording
            ) {
              console.log(
                "Configuration HeatmapSessionRecording (après délai):",
                window.Piwik.HeatmapSessionRecording
              );
            } else {
              console.log(
                "Piwik.HeatmapSessionRecording n'est toujours pas disponible après délai"
              );
            }
          }, 3000);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <GlobalStyles />
        <A11y />
        <Component {...pageProps} />
        {!router.pathname.startsWith("/widgets") && <CookieConsentLegacy />}
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default MyApp;
