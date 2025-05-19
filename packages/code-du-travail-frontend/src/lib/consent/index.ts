// Consent management service for tracking tools

// Consent types
export type ConsentType = {
  matomo: boolean;
  sea: boolean;
  matomoHeatmap: boolean;
};

// Local storage key for cookie consent
export const CONSENT_STORAGE_KEY = "cdtn-cookie-consent";

// Default consent state (opt-out by default)
export const DEFAULT_CONSENT: ConsentType = {
  matomo: false,
  sea: false,
  matomoHeatmap: false,
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
      return {
        ...DEFAULT_CONSENT,
        matomo: false,
        sea: false,
        matomoHeatmap: false,
      };
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
    // Ensure Matomo is always enabled (mandatory), but respect user choice for matomoHeatmap
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
  // Matomo Heatmap requires explicit consent
  applyMatomoHeatmapConsent(consent.matomoHeatmap);
  applySeaConsent(consent.sea);
};

// Apply Matomo Heatmap consent
const applyMatomoHeatmapConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    if (isConsented) {
      console.log("Activation de la carte des chaleurs Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["HeatmapSessionRecording.enable"]);
    } else {
      console.log("Désactivation de la carte des chaleurs Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["HeatmapSessionRecording.disable"]);
    }
  } catch (e) {
    console.error("Error applying Matomo Heatmap consent:", e);
  }
};

// Apply Matomo consent
const applyMatomoConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    if (isConsented) {
      console.log("Activation des cookies Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["forgetUserOptOut"]);
      window._paq.push(["rememberCookieConsentGiven"]);
    } else {
      console.log("Désactivation des cookies Matomo.");
      window._paq = window._paq || [];
      window._paq.push(["optUserOut"]);
      window._paq.push(["forgetCookieConsentGiven"]);
    }
  } catch (e) {
    console.error("Error applying Matomo consent:", e);
  }
};

// List of paths where SEA tracking is allowed
const SEA_ALLOWED_PATHS = [
  "/",
  "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
  "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  "/contribution/est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
  "/contribution/faut-il-respecter-un-delai-de-carence-entre-deux-cdd-si-oui-quelle-est-sa-duree",
  "/contribution/jours-feries-et-ponts-dans-le-secteur-prive",
  "/contribution/les-conges-pour-evenements-familiaux",
  "/contribution/quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
  "/contribution/quelle-est-la-duree-de-preavis-en-cas-de-depart-a-la-retraite",
  "/contribution/quelle-est-la-duree-du-conge-de-maternite",
  "/contribution/quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
  "/information/acquisition-de-conges-payes-pendant-un-arret-maladie-les-nouvelles-regles",
  "/information/la-prime-de-partage-de-la-valeur-infographie",
  "/information/licenciement-pour-inaptitude-medicale",
  "/information/licenciement-pour-motif-disciplinaire",
  "/information/licenciement-pour-motif-non-disciplinaire",
  "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective",
  "/information/quelles-sont-les-consequences-dun-abandon-de-poste-sur-le-contrat-de-travail",
  "/information/rupture-conventionnelle-individuelle-la-procedure-en-details",
  "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  "/modeles-de-courriers/attestation-de-travail",
  "/modeles-de-courriers/contrat-de-travail-a-duree-determinee-cdd",
  "/modeles-de-courriers/contrat-de-travail-a-duree-indeterminee",
  "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  "/modeles-de-courriers/demande-de-maintien-de-salaire-en-cas-darret-maladie",
  "/modeles-de-courriers/lettre-de-demission",
  "/modeles-de-courriers/promesse-dembauche",
  "/modeles-de-courriers/recu-pour-solde-de-tout-compte",
  "/modeles-de-courriers/rupture-de-periode-dessai-par-lemployeur",
  "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
  "/modeles-de-courriers/rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
  "/modeles-de-courriers/signalement-de-faits-pouvant-relever-du-harcelement-moral-ou-sexuel",
  "/outils/convention-collective",
  "/outils/indemnite-licenciement",
  "/outils/indemnite-precarite",
  "/outils/indemnite-rupture-conventionnelle",
  "/outils/preavis-demission",
  "/outils/simulateur-embauche",
];

// Check if current path is allowed for SEA tracking
const normalizePath = (path: string): string => {
  // Remove trailing slashes, query parameters and anchors
  return path.replace(/\/+$/, "").split(/[?#]/)[0];
};
const isPathAllowedForSEA = (): boolean => {
  if (typeof window === "undefined") return false;
  const currentPath = normalizePath(window.location.pathname);
  const isAllowed = SEA_ALLOWED_PATHS.some(
    (path) => normalizePath(path) === currentPath
  );

  console.log(
    `Current path: ${currentPath}, SEA tracking allowed: ${isAllowed}`
  );

  return isAllowed;
};

// Apply SEA consent (Google Tag Manager)
const applySeaConsent = (isConsented: boolean): void => {
  if (typeof window === "undefined") return;

  try {
    // Check if current path is allowed for SEA tracking
    const isAllowed = isPathAllowedForSEA();

    if (isConsented && isAllowed) {
      console.log("Activation du tracking SEA sur une page autorisée.");

      // Remove the opt-out cookie if it exists
      const disableStr = "ga-disable-DC-3048978";
      document.cookie =
        disableStr + "=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
      window[disableStr] = false;
      console.log(
        "Enabling Google Analytics tracking (removing opt-out cookie)"
      );

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
      if (isConsented && !isAllowed) {
        console.log("Page non autorisée pour le tracking SEA.");
      } else {
        console.log("Désactivation du tracking SEA.");
      }

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
    // Ensure Matomo is always enabled (mandatory), but respect user choice for matomoHeatmap
    const finalConsent = { ...consent, matomo: true };

    console.log("Consent has been given, current consent state:", finalConsent);

    applyConsent(finalConsent);

    // Set up listener for route changes in single-page applications
    setupRouteChangeListener();
  } else {
    // Don't apply any cookies if user hasn't consented yet
    console.log("No consent given yet, not loading any cookies");
  }
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
      console.log(`Path changed from ${previousPath} to ${currentPath}`);
      const consent = getStoredConsent();
      const finalConsent = { ...consent, matomo: true };
      console.log("Reapplying consent after path change:", finalConsent);
      applyConsent(finalConsent);
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
