import { captureException } from "@sentry/nextjs";
import { API_GEO_URL } from "../../../../config";
import { detectIfPostalCode } from "./utils";

type Result = {
  code: string;
  nom: string;
  population: number;
  _score?: number;
};

export const getCodeCommune = async (
  postalCodeOrName: string
): Promise<string | undefined> => {
  try {
    const isPostalCode = detectIfPostalCode(postalCodeOrName);
    const params = isPostalCode
      ? `codePostal=${postalCodeOrName}`
      : `nom=${postalCodeOrName}`;
    const response = await fetch(`${API_GEO_URL}/communes?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch commune code");
    }
    const result: Array<Result> = await response.json();

    if (!result || result.length === 0) {
      return undefined;
    }

    const sortedResult = result.sort((a, b) => b.population - a.population);
    return sortedResult[0].code;
  } catch (error) {
    captureException(error);
    return undefined;
  }
};
