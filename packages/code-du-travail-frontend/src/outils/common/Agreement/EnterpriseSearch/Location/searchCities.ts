import { captureException } from "@sentry/nextjs";
import {
  API_GEO_MAX_SEARCH_RESULTS,
  API_GEO_URL,
  DEBOUNCE_TIME_MS,
} from "../../../../../config";
import debounce from "debounce-promise";

export type ApiGeoResult = {
  code: string;
  nom: string;
  population: number;
  codeDepartement: string;
  codesPostaux: string[];
  _score?: number;
};

const apiGeoSearchCommunes = async (
  search: string
): Promise<ApiGeoResult[]> => {
  const fields = "nom,codesPostaux,population,codeDepartement";
  const response = await Promise.all([
    fetch(`${API_GEO_URL}/communes?nom=${search}&fields=${fields}`),
    fetch(`${API_GEO_URL}/communes?codePostal=${search}&fields=${fields}`),
  ]);
  const apiResults = await Promise.all(
    response.map((r) => r.json() as any as ApiGeoResult[])
  );
  const results = [
    ...apiResults[0].slice(0, API_GEO_MAX_SEARCH_RESULTS),
    ...apiResults[1],
  ];
  const sortedResult = results.sort((a, b) => b.population - a.population);
  return sortedResult;
};

export const searchCities = debounce(apiGeoSearchCommunes, DEBOUNCE_TIME_MS);
