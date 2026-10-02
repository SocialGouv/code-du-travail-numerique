// Consent management service for tracking tools

import { isAdsEnabled } from "../analytics/config";
import { safeGetItem, safeRemoveItem, safeSetItem } from "./storage";

// Consent types
export type ConsentType = {
  matomo: boolean;
  sea: boolean;
  matomoHeatmap: boolean;
};

// Local storage keys for cookie consent
export const CONSENT_STORAGE_KEY = "cdtn-cookie-consent";
export const CONSENT_GIVEN_KEY = "cdtn-cookie-consent-given";
export const CONSENT_DATE_KEY = "cdtn-cookie-consent-date";
export const CONSENT_VERSION_KEY = "cdtn-cookie-consent-version";

// Bump to ask every visitor again and reset Matomo cookies (see
// resetOutdatedConsent). 2: cookieless Matomo after a refusal, SEA campaign 2026.
export const CONSENT_VERSION = "2";

const isCurrentConsentVersion = (): boolean =>
  safeGetItem(CONSENT_VERSION_KEY) === CONSENT_VERSION;

// Consent is valid for 13 months (CNIL recommendation)
export const CONSENT_VALIDITY_MS = 13 * 30 * 24 * 60 * 60 * 1000;

// Default consent state (opt-out by default)
export const DEFAULT_CONSENT: ConsentType = {
  matomo: true,
  sea: false,
  matomoHeatmap: false,
};

export const isConsentExpired = (): boolean => {
  if (typeof window === "undefined") return false;

  const storedDate = safeGetItem(CONSENT_DATE_KEY);
  if (!storedDate) return false;

  const consentTimestamp = Number(storedDate);
  if (Number.isNaN(consentTimestamp)) return true;

  return Date.now() - consentTimestamp > CONSENT_VALIDITY_MS;
};

export const hasValidConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  if (!isCurrentConsentVersion()) return false;
  const hasConsented = safeGetItem(CONSENT_GIVEN_KEY) === "true";
  if (!hasConsented) return false;

  const storedConsent = safeGetItem(CONSENT_STORAGE_KEY);
  const consent: ConsentType = storedConsent
    ? JSON.parse(storedConsent)
    : DEFAULT_CONSENT;
  const hasAccepted = Object.values(consent).some(Boolean);

  return !hasAccepted || !isConsentExpired();
};

export const clearStoredConsent = (): void => {
  safeRemoveItem(CONSENT_GIVEN_KEY);
  safeRemoveItem(CONSENT_STORAGE_KEY);
  safeRemoveItem(CONSENT_DATE_KEY);
};

// Get consent from local storage
export const getStoredConsent = (): ConsentType => {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  if (!hasValidConsent()) {
    return DEFAULT_CONSENT;
  }

  const storedConsent = safeGetItem(CONSENT_STORAGE_KEY);
  return storedConsent ? JSON.parse(storedConsent) : DEFAULT_CONSENT;
};

// Consent actually applied to tracking tools. Until the user has made a valid
// choice, Matomo measures without cookies (DEFAULT_CONSENT.matomo only drives
// the initial state of the toggle in the modal).
const getAppliedConsent = (): ConsentType =>
  hasValidConsent()
    ? getStoredConsent()
    : { ...DEFAULT_CONSENT, matomo: false };

// Matomo cookies (_pk_*, mtm_*) are only allowed after an explicit acceptance,
// and never after an explicit opt-out. Without them, Matomo still tracks page
// views and events, without any cookie.
export const hasMatomoCookieConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return getAppliedConsent().matomo && !isMatomoOptedOut();
};

// Cookie set by Matomo on an explicit opt-out ("ne jamais être suivi" in the
// privacy policy). As long as it exists, Matomo sends nothing. The cookie
// banner only governs cookies and never lifts it (except resetOutdatedConsent).
const MATOMO_OPT_OUT_COOKIE = "mtm_consent_removed";
const MATOMO_COOKIE_PREFIXES = ["_pk_", "mtm_", "matomo_"];

const getCookieNames = (): string[] =>
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter(Boolean);

export const isMatomoOptedOut = (): boolean => {
  if (typeof document === "undefined") return false;
  return getCookieNames().includes(MATOMO_OPT_OUT_COOKIE);
};

// Remove Matomo cookies left by a previous acceptance. The opt-out cookie is
// kept, unless the whole consent is reset.
const deleteMatomoCookies = (includeOptOut = false): void => {
  const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  getCookieNames()
    .filter(
      (name) =>
        (includeOptOut || name !== MATOMO_OPT_OUT_COOKIE) &&
        MATOMO_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))
    )
    .forEach((name) => {
      document.cookie = name + expired;
      document.cookie = `${name}${expired}; domain=.${window.location.hostname}`;
    });
};

// Once per consent version, every visitor starts again from a clean state:
// the previous choice is forgotten (the banner is shown again) and every
// Matomo cookie is removed, opt-out included. Before version 2, a refusal in
// the banner set the same opt-out cookie as "ne jamais être suivi", and the
// two could not be told apart.
const resetOutdatedConsent = (): void => {
  if (isCurrentConsentVersion()) return;

  clearStoredConsent();
  deleteMatomoCookies(true);
  window._paq = window._paq || [];
  window._paq.push(["forgetUserOptOut"]);
  safeSetItem(CONSENT_VERSION_KEY, CONSENT_VERSION);
};

// Save consent to local storage
export const saveConsent = (consent: ConsentType): void => {
  if (typeof window === "undefined") return;

  resetOutdatedConsent();
  safeSetItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  safeSetItem(CONSENT_GIVEN_KEY, "true");
  safeSetItem(CONSENT_DATE_KEY, Date.now().toString());
  applyConsent(consent);

  window.dispatchEvent(new Event("cdtn:consent-updated"));
};

// Apply consent settings to tracking tools
export const applyConsent = (consent: ConsentType): void => {
  applyMatomoConsent(consent.matomo);
  applyMatomoHeatmapConsent(consent.matomoHeatmap);
  applySeaConsent(consent.sea);
};

// Apply Matomo Heatmap consent
const applyMatomoHeatmapConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    window._paq = window._paq || [];

    if (isConsented) {
      window._paq.push(["HeatmapSessionRecording::enable"]);
    } else {
      window._paq.push(["HeatmapSessionRecording::disable"]);
    }
  } catch (e) {
    console.error("Error applying Matomo Heatmap consent:", e);
  }
};

// Apply Matomo consent
const applyMatomoConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    window._paq = window._paq || [];

    // An explicit opt-out wins over the cookie banner: no cookie at all
    if (isConsented && !isMatomoOptedOut()) {
      window._paq.push(["rememberCookieConsentGiven"]);
    } else {
      // Refusal: tracking stays active, without any cookie. matomo.js applies
      // disableCookies before queued trackPageView once loaded, and
      // immediately when already loaded.
      window._paq.push(["forgetCookieConsentGiven"]);
      window._paq.push(["disableCookies"]);
      deleteMatomoCookies();
    }
  } catch (e) {
    console.error("Error applying Matomo consent:", e);
  }
};

// Campagne SEA 2026 (DicomTravail) : balise Floodlight « ToutesPages », posée
// sur tout le site hors widgets (cf. isAdsEnabled)
const SEA_TAG_ID = "DC-3048978";
const SEA_CONVERSION_SEND_TO = `${SEA_TAG_ID}/cdtn/2026-0+unique`;

// Apply SEA consent (Google Tag Manager)
const applySeaConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    const isAllowed = isAdsEnabled(window.location.pathname);

    if (isConsented && isAllowed) {
      // Remove the opt-out cookie if it exists
      const disableStr = `ga-disable-${SEA_TAG_ID}`;
      document.cookie =
        disableStr + "=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
      window[disableStr] = false;

      // Load Google Tag Manager script if not already loaded
      if (!document.getElementById("gtm-script")) {
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${SEA_TAG_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", SEA_TAG_ID);

        // Add conversion tracking
        window.gtag("event", "conversion", {
          allow_custom_scripts: true,
          send_to: SEA_CONVERSION_SEND_TO,
        });
      }
    } else {
      // Remove Google Tag Manager script if it exists
      const script = document.getElementById("gtm-script");
      if (script) {
        script.remove();
      }

      // Clear dataLayer
      window.dataLayer = [];

      // Set opt-out cookie for Google Analytics
      const disableStr = `ga-disable-${SEA_TAG_ID}`;
      document.cookie =
        disableStr + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
      window[disableStr] = true;
    }
  } catch (e) {
    console.error("Error applying SEA consent:", e);
  }
};

// Initialize consent on page load
export const initConsent = (): void => {
  if (typeof window === "undefined") return;

  resetOutdatedConsent();
  applyConsent(getAppliedConsent());

  // Set up listener for route changes in single-page applications
  setupRouteChangeListener();
};

// Set up listener for route changes to reapply consent when navigating between pages
const setupRouteChangeListener = (): void => {
  if (typeof window === "undefined") return;

  // Store the current path
  let currentPath = window.location.pathname;

  // Function to handle route changes
  const handleRouteChange = (): void => {
    if (currentPath !== window.location.pathname) {
      // Update the current path
      const previousPath = currentPath;
      currentPath = window.location.pathname;
      // Reapply consent based on the new path
      applyConsent(getAppliedConsent());
    }
  };
  // Listen for popstate events (back/forward navigation)
  window.addEventListener("popstate", handleRouteChange);
  // Monkey-patch pushState to detect programmatic navigation
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handleRouteChange();
  };
};

// Declare global window types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    [key: string]: any;
  }
}
