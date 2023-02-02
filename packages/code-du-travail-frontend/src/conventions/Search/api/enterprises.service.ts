import debounce from "debounce-promise";
import memoizee from "memoizee";
import getConfig from "next/config";

import { Agreement } from "./type";

export interface ApiEnterpriseData {
  entreprises: Enterprise[];
}

export interface Enterprise {
  activitePrincipale?: string;
  conventions: Agreement[];
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  address?: string;
  firstMatchingEtablissement?: MatchingEtablissement;
}

export interface MatchingEtablissement {
  siret: string;
  address: string;
}

const siretSirenError =
  "Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide";

const siretLengthError =
  "Veuillez indiquer un numéro Siret (14 chiffres obligatoire)";

const siretNumberError =
  "Veuillez indiquer un numéro Siret (14 chiffres uniquement)";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const apiEnterprises = memoizee(function createFetcher(
  query: string,
  address: string | undefined | null = undefined
): Promise<Enterprise[]> {
  if (/^\d{2,8}$/.test(query.replace(/\s/g, ""))) {
    return Promise.reject(siretSirenError);
  }
  if (
    /^\d{10,13}$/.test(query.replace(/\s/g, "")) ||
    /^\d{15,}$/.test(query.replace(/\s/g, ""))
  ) {
    return Promise.reject(siretLengthError);
  }
  if (/\D+\d{14}/.test(query.replace(/\s/g, ""))) {
    return Promise.reject(siretNumberError);
  }

  const url = `${API_URL}/enterprises?q=${encodeURIComponent(query)}${
    address ? `&a=${encodeURIComponent(address)}` : ""
  }`;

  // if (/^\d{14}$/.test(query.replace(/\s/g, ""))) {
  //   url = `${ENTERPRISE_API_URL}/etablissement/${query}`;
  // } else if (/^\d{9}$/.test(query.replace(/\s/g, ""))) {
  //   url = `${ENTERPRISE_API_URL}/entreprise/${query}`;
  // }

  return fetch(url)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 404) {
        return { entreprises: [] };
      }
      const errorMessage = await response.text();
      return Promise.reject(errorMessage);
    })
    .then((result: ApiEnterpriseData) => {
      return result.entreprises;
    });
});

const searchEnterprises = debounce(apiEnterprises, 300);

export { searchEnterprises };
