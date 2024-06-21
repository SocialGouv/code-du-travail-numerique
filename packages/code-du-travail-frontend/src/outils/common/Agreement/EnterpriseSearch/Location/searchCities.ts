import { captureException } from "@sentry/nextjs";
import { API_GEO_URL, DEBOUNCE_TIME_MS } from "../../../../../config";
import debounce from "debounce-promise";

export type ApiGeoResult = {
  code: string;
  nom: string;
  population: number;
  _score?: number;
};

const apiGeoSearchCommunes = async (
  search: string
): Promise<ApiGeoResult[]> => {
  const fields = "nom,codesPostaux,population";
  try {
    const response = await Promise.all([
      fetch(`${API_GEO_URL}/communes?codePostal=${search}&fields=${fields}`),
      fetch(`${API_GEO_URL}/communes?nom=${search}&fields=${fields}`),
    ]);
    const results = (
      await Promise.all(response.map((r) => r.json() as any as ApiGeoResult[]))
    ).flat();
    const sortedResult = results.sort((a, b) => b.population - a.population);
    return sortedResult;
  } catch (error) {
    captureException(error);
    return [];
  }
};

export const searchCities = debounce(apiGeoSearchCommunes, DEBOUNCE_TIME_MS);
