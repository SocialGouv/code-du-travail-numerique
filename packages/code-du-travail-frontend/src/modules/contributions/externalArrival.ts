import { AGREEMENT_FOCUS_HASH } from "./contributionUtils";

// Consommé au premier appel : au plus une détection par chargement de document.
// Les navigations SPA suivantes (le module reste chargé) répondent donc false,
// et le double-effet de React StrictMode est sans conséquence.
let consumed = false;

/**
 * Détecte une arrivée « externe » sur la page courante : chargement initial du
 * document avec un referrer absent (accès direct, favori) ou d'un autre hôte
 * (moteur de recherche, site tiers). À n'appeler que côté client (useEffect).
 *
 * `document.referrer` ne change pas lors des navigations client Next : on ne
 * peut conclure qu'au chargement initial du document, identifié en comparant
 * l'URL courante à celle de l'entrée de navigation du document.
 */
export const isExternalArrival = (): boolean => {
  if (consumed) return false;
  consumed = true;
  try {
    // API absente (vieux navigateurs, jsdom) : on ne peut rien conclure, on
    // conserve le comportement historique (pas de réinitialisation).
    if (typeof performance?.getEntriesByType !== "function") return false;
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (!nav) return false;
    // Retour via l'historique : l'usager revient sur une page déjà consultée
    // (le referrer d'origine est préservé, il ne signifie plus rien).
    if (nav.type === "back_forward") return false;
    // L'URL courante diffère de celle du chargement du document : une
    // navigation SPA a déjà eu lieu, l'usager vient de l'interne.
    if (new URL(nav.name).pathname !== window.location.pathname) return false;
    // Arrivée par le formulaire de la fiche générique (cf. AGREEMENT_FOCUS_HASH).
    if (window.location.hash === AGREEMENT_FOCUS_HASH) return false;
    if (!document.referrer) return true;
    return new URL(document.referrer).host !== window.location.host;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const resetExternalArrivalForTests = () => {
  consumed = false;
};
