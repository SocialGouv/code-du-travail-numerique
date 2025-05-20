"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../../lib/consent";

/**
 * Composant qui initialise Matomo selon la documentation officielle
 * Cette approche utilise le script standard recommandé par Matomo
 */
function MatomoComponent() {
  const path = usePathname();
  const [isClient, setIsClient] = useState(false);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Ne rien faire si nous ne sommes pas côté client
    if (!isClient) return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();
    console.log("DSFR Matomo consent (Standard approach):", consent);

    // Ne pas initialiser Matomo sur les pages widgets
    if (path?.match(WIDGETS_PATH)) {
      console.log("Skipping Matomo initialization on widget page");
      return;
    }

    try {
      // Nettoyer toute instance précédente
      (window as any)._paq = [];

      // Supprimer tout script Matomo existant
      document
        .querySelectorAll('script[src*="matomo"]')
        .forEach((script) => script.remove());

      console.log("Initializing Matomo with standard script (App Router)");

      // Initialiser _paq
      (window as any)._paq = (window as any)._paq || [];

      // Configuration de base
      (window as any)._paq.push(["setTrackerUrl", `${PIWIK_URL}/matomo.php`]);
      (window as any)._paq.push(["setSiteId", PIWIK_SITE_ID]);

      // Fonctionnalités de base si l'utilisateur a donné son consentement
      if (consent.matomo) {
        (window as any)._paq.push(["enableHeartBeatTimer"]);
        (window as any)._paq.push(["enableLinkTracking"]);
        (window as any)._paq.push(["trackPageView"]);
      }

      // Charger le script Matomo selon la méthode standard
      const scriptElement = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.defer = true;
      scriptElement.src = `${PIWIK_URL}/matomo.js`;
      document.head.appendChild(scriptElement);

      console.log("Matomo script loaded, waiting for initialization...");

      // Attendre que Matomo soit complètement chargé avant d'activer la carte des chaleurs
      scriptElement.onload = () => {
        console.log("Matomo script loaded successfully");

        // Activer la carte des chaleurs après un court délai
        setTimeout(() => {
          if (consent.matomoHeatmap) {
            console.log("Activating Matomo Heatmap with standard approach");

            // Configuration de la carte des chaleurs
            (window as any)._paq.push([
              "HeatmapSessionRecording.setRecordingEnvironment",
              "production",
            ]);
            (window as any)._paq.push([
              "HeatmapSessionRecording.setKeystrokes",
              "false",
            ]);
            (window as any)._paq.push([
              "HeatmapSessionRecording.setCaptureVisibleContentOnly",
              "false",
            ]);
            (window as any)._paq.push(["HeatmapSessionRecording.enable"]);

            // Événement spécifique pour la carte des chaleurs
            (window as any)._paq.push([
              "trackEvent",
              "Heatmap_Test",
              "Page_Visit",
              window.location.pathname,
            ]);

            console.log(
              "Heatmap tracking event sent:",
              window.location.pathname
            );
          }
        }, 1000); // Attendre 1 seconde pour s'assurer que Matomo est complètement initialisé
      };

      // Gérer les erreurs de chargement
      scriptElement.onerror = (error) => {
        console.error("Error loading Matomo script:", error);
      };
    } catch (error) {
      console.error("Error initializing Matomo:", error);
    }

    // Nettoyage lors du démontage
    return () => {
      document
        .querySelectorAll('script[src*="matomo"]')
        .forEach((script) => script.remove());
    };
  }, [isClient, path]);

  return null;
}

/**
 * Composant exporté qui s'assure que MatomoComponent est rendu uniquement côté client
 */
export const MatomoAnalytics = () => (
  <Suspense>
    <MatomoComponent />
  </Suspense>
);
