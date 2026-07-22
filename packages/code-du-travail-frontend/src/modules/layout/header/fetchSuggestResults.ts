import debounce from "debounce-promise";
import { SITE_URL, SUGGEST_DEBOUNCE_DELAY } from "../../../config";

const fetchSuggestResultsWithoutDebounce = async (
  query
): Promise<Array<string>> => {
  // Même seuil que l'API : en dessous de 3 caractères, /api/suggest renvoie
  // 400 (pas de sens à suggérer). On évite l'appel plutôt que de le laisser
  // échouer et remonter dans Sentry à chaque frappe.
  if (!query || query.length < 3) {
    return [];
  }
  const url = `${SITE_URL}/api/suggest?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

export const fetchSuggestResults = debounce(
  fetchSuggestResultsWithoutDebounce,
  SUGGEST_DEBOUNCE_DELAY
);
