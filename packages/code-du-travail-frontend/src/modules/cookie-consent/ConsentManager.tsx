"use client";

import { useEffect } from "react";
import { initConsent } from "../../lib/consent";
import { CookieConsentDSFR } from "./CookieConsent";

/**
 * ConsentManager - Gère l'initialisation et l'affichage du consentement des cookies
 *
 * Ce composant:
 * 1. Initialise le système de consentement au chargement de la page
 * 2. Affiche la bannière de consentement des cookies
 */
export const ConsentManager = () => {
  // Initialiser le consentement au chargement de la page
  useEffect(() => {
    initConsent();
  }, []);

  return <CookieConsentDSFR />;
};

export default ConsentManager;
