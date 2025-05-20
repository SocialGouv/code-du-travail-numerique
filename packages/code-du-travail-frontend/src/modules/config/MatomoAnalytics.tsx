"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, WIDGETS_PATH } from "../../config";
import { getStoredConsent } from "../../lib/consent";

/**
 * Hook personnalisé pour initialiser Matomo uniquement côté client
 * Cette approche est spécifique pour l'App Router de Next.js
 */
function useMatomoClient() {
  const path = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Ne rien faire si le composant n'est pas monté (côté serveur)
    if (!isMounted) return;

    // Vérifier le consentement de l'utilisateur
    const consent = getStoredConsent();
    console.log("DSFR Matomo consent (App Router):", consent);

    // Ne pas initialiser Matomo sur les pages widgets
    if (path?.match(WIDGETS_PATH)) {
      console.log("Skipping Matomo initialization on widget page");
      return;
    }

    // Supprimer tout script Matomo existant
    const existingScript = document.getElementById("matomo-script");
    if (existingScript) {
      existingScript.remove();
    }

    // Créer un nouveau script pour initialiser Matomo
    const script = document.createElement("script");
    script.id = "matomo-script";
    script.type = "text/javascript";

    // Contenu du script avec toute la configuration Matomo
    script.textContent = `
      // Initialisation de Matomo
      var _paq = window._paq = window._paq || [];
      
      // Configuration de base
      _paq.push(['setTrackerUrl', '${PIWIK_URL}/matomo.php']);
      _paq.push(['setSiteId', '${PIWIK_SITE_ID}']);
      
      // Fonctionnalités de base
      ${consent.matomo ? "_paq.push(['enableHeartBeatTimer']);" : ""}
      ${consent.matomo ? "_paq.push(['enableLinkTracking']);" : ""}
      
      // Configuration de la carte des chaleurs
      ${consent.matomoHeatmap ? "_paq.push(['HeatmapSessionRecording.setRecordingEnvironment', 'production']);" : ""}
      ${consent.matomoHeatmap ? "_paq.push(['HeatmapSessionRecording.setKeystrokes', 'false']);" : ""}
      ${consent.matomoHeatmap ? "_paq.push(['HeatmapSessionRecording.setCaptureVisibleContentOnly', 'false']);" : ""}
      ${consent.matomoHeatmap ? "_paq.push(['HeatmapSessionRecording.enable']);" : ""}
      
      // Événement spécifique pour la carte des chaleurs
      ${consent.matomoHeatmap ? "_paq.push(['trackEvent', 'Heatmap_Test', 'Page_Visit', window.location.pathname]);" : ""}
      
      // Tracker la page vue
      ${consent.matomo ? "_paq.push(['trackPageView']);" : ""}
    `;

    // Ajouter le script au document
    document.head.appendChild(script);

    // Créer un second script pour charger Matomo
    const loaderScript = document.createElement("script");
    loaderScript.id = "matomo-loader-script";
    loaderScript.async = true;
    loaderScript.defer = true;
    loaderScript.src = `${PIWIK_URL}/matomo.js`;

    // Ajouter le script de chargement au document
    document.head.appendChild(loaderScript);

    console.log(
      "Matomo scripts injected directly in DSFR version (App Router)"
    );

    return () => {
      // Nettoyer les scripts lors du démontage du composant
      const scriptToRemove = document.getElementById("matomo-script");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }

      const loaderToRemove = document.getElementById("matomo-loader-script");
      if (loaderToRemove) {
        loaderToRemove.remove();
      }
    };
  }, [isMounted, path]); // Dépendance à isMounted pour s'assurer que le code s'exécute uniquement côté client
}

/**
 * Composant qui utilise le hook personnalisé pour initialiser Matomo
 */
function MatomoComponent() {
  useMatomoClient();
  return null;
}

/**
 * Composant exporté qui s'assure que MatomoComponent est rendu uniquement côté client
 */
export const MatomoAnalytics = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Suspense>
      <MatomoComponent />
    </Suspense>
  );
};
