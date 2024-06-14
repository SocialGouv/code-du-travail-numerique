import { captureException } from "@sentry/nextjs";
import { API_GEO_URL } from "../../../../config";
import { detectIfPostalCode } from "./utils";

export const getCodeCommune = async (
  postalCodeOrName: string
): Promise<string | undefined> => {
  try {
    const isPostalCode = detectIfPostalCode(postalCodeOrName);
    const params = isPostalCode
      ? `codePostal=${postalCodeOrName}&fields=code`
      : `nom=${postalCodeOrName}&fields=code`;
    const response = await fetch(`${API_GEO_URL}/communes?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch commune code");
    }
    const result = await response.json();
    console.log(result);

    if (!result || result.length === 0) {
      return undefined;
    }
    return result[0].code;
  } catch (error) {
    captureException(error);
    return undefined;
  }
};
