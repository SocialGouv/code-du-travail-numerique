"use client";

import { useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../../lib/consent";
import init, { push } from "./MatomoNext";
import { usePathname } from "next/navigation";

/**
 * Composant spécifique pour initialiser Matomo au niveau racine de l'application
 * Ce composant est conçu pour être utilisé dans le layout racine (app/layout.tsx)
 */
export default function MatomoRootInitializer() {
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Ne rien faire si nous ne sommes pas côté client
    if (!isClient) return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();
    console.log("Root Matomo consent:", consent);

    // Ne pas initialiser Matomo sur les pages widgets
    if (path?.match(WIDGETS_PATH)) {
      console.log("Skipping Matomo initialization on widget page (root)");
      return;
    }

    try {
      // Initialiser Matomo
      init({
        siteId: PIWIK_SITE_ID,
        url: PIWIK_URL,
        onInitialization: () => {
          console.log("Matomo initialized at root level");

          // Activer les fonctionnalités de base si l'utilisateur a donné son consentement
          if (consent.matomo) {
            console.log("Enabling Matomo basic features (root)");
            push(["enableHeartBeatTimer"]);
            push(["enableLinkTracking"]);
            push(["trackPageView"]);
          }

          // Activer la carte des chaleurs si l'utilisateur a donné son consentement
          if (consent.matomoHeatmap) {
            console.log("Enabling Matomo Heatmap at root level");

            // Configuration de la carte des chaleurs
            push([
              "HeatmapSessionRecording.setRecordingEnvironment",
              "production",
            ]);
            push(["HeatmapSessionRecording.setKeystrokes", "false"]);
            push([
              "HeatmapSessionRecording.setCaptureVisibleContentOnly",
              "false",
            ]);
            push(["HeatmapSessionRecording.enable"]);

            // Événement spécifique pour la carte des chaleurs
            push([
              "trackEvent",
              "Heatmap_Test",
              "Page_Visit",
              window.location.pathname,
            ]);

            console.log(
              "Heatmap tracking event sent from root:",
              window.location.pathname
            );
          }
        },
      });
    } catch (error) {
      console.error("Error initializing Matomo at root level:", error);
    }
  }, [isClient, path]);

  return null;
}
