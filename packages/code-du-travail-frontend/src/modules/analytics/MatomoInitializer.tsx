"use client";

import { useEffect } from "react";
import { init, push } from "@socialgouv/matomo-next";
import { useRouter } from "next/router";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL, WIDGETS_PATH } from "../../config";
import { getSourceUrlFromPath } from "../utils/url";

/**
 * MatomoInitializer - Initialise le tracking Matomo
 *
 * Ce composant:
 * 1. Initialise Matomo au chargement de la page
 * 2. Configure les paramètres de base pour le tracking
 * 3. Active les fonctionnalités nécessaires (heartbeat, link tracking)
 */
export const MatomoInitializer = () => {
  const router = useRouter();

  useEffect(() => {
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

        // Activation des fonctionnalités de base
        push(["enableHeartBeatTimer"]);
        push(["enableLinkTracking"]);

        // Activer le mode debug de Matomo en développement
        if (process.env.NODE_ENV !== "production") {
          push(["setDebugMode", "true"]);
        }
      },
      excludeUrlsPatterns: [WIDGETS_PATH],
    });
  }, [router.asPath, router.pathname]); // Ajout des dépendances manquantes

  return null;
};

export default MatomoInitializer;
