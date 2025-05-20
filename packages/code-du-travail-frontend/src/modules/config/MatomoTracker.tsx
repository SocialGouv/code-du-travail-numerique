"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../../lib/consent";

/**
 * Composant qui initialise Matomo et suit les changements de route dans l'App Router
 * Inclut une capture d'écran manuelle pour les heatmaps
 */
export default function MatomoTracker() {
  const pathname = usePathname();
  const [initialized, setInitialized] = useState(false);

  // Initialiser Matomo une seule fois
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();
    console.log("Matomo consent (App Router):", consent);

    // Ne pas initialiser Matomo sur les pages widgets
    if (pathname?.match(WIDGETS_PATH)) {
      console.log("Skipping Matomo initialization on widget page");
      return;
    }

    // Éviter la double initialisation
    if (initialized) return;

    try {
      console.log("Initializing Matomo (App Router)");

      // Initialiser _paq
      (window as any)._paq = (window as any)._paq || [];

      // Configuration de base
      (window as any)._paq.push(["setTrackerUrl", `${PIWIK_URL}/matomo.php`]);
      (window as any)._paq.push(["setSiteId", PIWIK_SITE_ID]);

      // Fonctionnalités de base si l'utilisateur a donné son consentement
      if (consent.matomo) {
        (window as any)._paq.push(["enableHeartBeatTimer"]);
        (window as any)._paq.push(["enableLinkTracking"]);
      }

      // Charger le script Matomo
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = `${PIWIK_URL}/matomo.js`;

      // Configurer la carte des chaleurs après le chargement du script
      script.onload = () => {
        console.log("Matomo script loaded successfully");

        if (consent.matomoHeatmap) {
          console.log("Configuring Matomo Heatmap (App Router)");

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
        }

        // Marquer l'initialisation comme terminée
        setInitialized(true);
      };

      // Ajouter le script au document
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error initializing Matomo:", error);
    }
  }, [initialized, pathname]);

  // Suivre les changements de route
  useEffect(() => {
    if (typeof window === "undefined" || !initialized) return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();

    // Ne pas suivre les pages widgets
    if (pathname?.match(WIDGETS_PATH)) return;

    try {
      console.log("Tracking page view:", pathname);

      // Configurer l'URL et le titre
      (window as any)._paq.push(["setCustomUrl", window.location.href]);
      (window as any)._paq.push(["setDocumentTitle", document.title]);

      // Suivre la page vue si l'utilisateur a donné son consentement
      if (consent.matomo) {
        (window as any)._paq.push(["trackPageView"]);
      }

      // Envoyer un événement pour la carte des chaleurs
      if (consent.matomoHeatmap) {
        console.log("Sending heatmap event for:", pathname);

        (window as any)._paq.push([
          "trackEvent",
          "Heatmap_Test",
          "Page_Visit",
          pathname,
        ]);
      }
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }, [pathname, initialized]);

  // Forcer la capture d'écran manuellement après le chargement complet de la page
  useEffect(() => {
    if (typeof window === "undefined" || !initialized) return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();
    if (!consent.matomoHeatmap) return;

    // Ne pas capturer les pages widgets
    if (pathname?.match(WIDGETS_PATH)) return;

    const handleLoad = () => {
      console.log("Page fully loaded, forcing heatmap capture");

      try {
        // Forcer la capture d'écran pour la carte des chaleurs
        if ((window as any)._paq) {
          // Réactiver la carte des chaleurs pour s'assurer qu'elle est active
          (window as any)._paq.push(["HeatmapSessionRecording.enable"]);

          // Forcer une capture d'écran
          (window as any)._paq.push(["HeatmapSessionRecording.capturePage"]);

          console.log("Heatmap capture forced successfully");
        }
      } catch (error) {
        console.error("Error forcing heatmap capture:", error);
      }
    };

    // Attendre que la page soit complètement chargée
    if (document.readyState === "complete") {
      // Si la page est déjà chargée, forcer la capture immédiatement
      handleLoad();
    } else {
      // Sinon, attendre l'événement load
      window.addEventListener("load", handleLoad);

      // Nettoyer l'écouteur d'événement lors du démontage
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }

    // Forcer également la capture après un délai pour s'assurer que tout le contenu dynamique est chargé
    const timeoutId = setTimeout(() => {
      console.log("Forcing heatmap capture after delay");

      try {
        if ((window as any)._paq) {
          (window as any)._paq.push(["HeatmapSessionRecording.enable"]);
          (window as any)._paq.push(["HeatmapSessionRecording.capturePage"]);
        }
      } catch (error) {
        console.error("Error forcing delayed heatmap capture:", error);
      }
    }, 2000); // Attendre 2 secondes pour s'assurer que tout est chargé

    // Nettoyer le timeout lors du démontage
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, initialized]);

  return null;
}
