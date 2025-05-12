// Consent management service for tracking tools

// Consent types
export type ConsentType = {
  matomo: boolean;
  sea: boolean;
};

// Local storage key for cookie consent
export const CONSENT_STORAGE_KEY = "cdtn-cookie-consent";

// Default consent state (opt-out by default)
export const DEFAULT_CONSENT: ConsentType = {
  matomo: false,
  sea: false,
};

// Get consent from local storage
export const getStoredConsent = (): ConsentType => {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    // Check if user has explicitly consented
    const hasConsented = localStorage.getItem("cdtn-cookie-consent-given");

    // If user hasn't consented yet, return default with no tracking
    if (!hasConsented) {
      return { ...DEFAULT_CONSENT, matomo: false, sea: false };
    }

    return storedConsent ? JSON.parse(storedConsent) : DEFAULT_CONSENT;
  } catch (e) {
    console.error("Error reading consent from localStorage:", e);
    return DEFAULT_CONSENT;
  }
};

// Save consent to local storage
export const saveConsent = (consent: ConsentType): void => {
  if (typeof window === "undefined") return;

  try {
    // Ensure Matomo is always enabled (mandatory)
    const finalConsent = { ...consent, matomo: true };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(finalConsent));
    applyConsent(finalConsent);
  } catch (e) {
    console.error("Error saving consent to localStorage:", e);
  }
};

// Apply consent settings to tracking tools
export const applyConsent = (consent: ConsentType): void => {
  // Matomo is always enabled (mandatory)
  applyMatomoConsent(true);
  applySeaConsent(consent.sea);
};

// Apply Matomo consent
const applyMatomoConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    if (isConsented) {
      console.debug("Activation des cookies Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["forgetUserOptOut"]);
      window._paq.push(["rememberCookieConsentGiven"]);
    } else {
      console.debug("Désactivation des cookies Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["optUserOut"]);
      window._paq.push(["forgetCookieConsentGiven"]);
    }
  } catch (e) {
    console.error("Error applying Matomo consent:", e);
  }
};

// Apply SEA consent (Google Tag Manager)
const applySeaConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    if (isConsented) {
      console.debug("Activation du tracking SEA.");

      // Load Google Tag Manager script if not already loaded
      if (!document.getElementById("gtm-script")) {
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=DC-3048978";
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", "DC-3048978");

        // Add conversion tracking
        window.gtag("event", "conversion", {
          allow_custom_scripts: true,
          send_to: "DC-3048978/cdtn/arr_cdtn+unique",
        });
      }
    } else {
      console.debug("Désactivation du tracking SEA.");

      // Remove Google Tag Manager script if it exists
      const script = document.getElementById("gtm-script");
      if (script) {
        script.remove();
      }

      // Clear dataLayer
      window.dataLayer = [];

      // Set opt-out cookie for Google Analytics
      const disableStr = "ga-disable-DC-3048978";
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

  // Check if user has explicitly consented
  const hasConsented = localStorage.getItem("cdtn-cookie-consent-given");

  if (hasConsented) {
    const consent = getStoredConsent();
    // Ensure Matomo is always enabled (mandatory)
    const finalConsent = { ...consent, matomo: true };
    applyConsent(finalConsent);
  } else {
    // Don't apply any cookies if user hasn't consented yet
    console.debug("No consent given yet, not loading any cookies");
  }
};

// Declare global window types
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    [key: string]: any;
  }
}
