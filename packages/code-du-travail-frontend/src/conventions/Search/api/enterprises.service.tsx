import debounce from "debounce-promise";
import memoizee from "memoizee";
import React from "react";

import { InlineError } from "../../../outils/common/ErrorField";

export interface ApiEnterpriseData {
  entreprises: Enterprise[];
}

export interface Enterprise {
  activitePrincipale?: string;
  conventions: AgreementData[];
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  matchingEtablissement: MatchingEtablissement;
}

/**
 * Agreement type from @socialgouv/kali-data/data/index.json
 */
export interface AgreementData {
  idcc: number;
  shortTitle: string;
  etat?: string;
  id?: string;
  mtime?: number;
  texte_de_base?: string;
  url?: string;
  title?: string;
}

export interface MatchingEtablissement {
  siret: string;
  address: string;
}

const ENTERPRISE_API_URL =
  "https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search";

const siretSirenError = (
  <InlineError>
    Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide
  </InlineError>
);

const siretLengthError = (
  <InlineError>
    Veuillez indiquer un numéro Siret (14 chiffres obligatoire)
  </InlineError>
);
const siretNumberError = (
  <InlineError>
    Veuillez indiquer un numéro Siret (14 chiffres uniquement)
  </InlineError>
);
const apiEnterprises = memoizee(function createFetcher(
  query: string,
  address?: string
) {
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
  const url = `${ENTERPRISE_API_URL}?q=${encodeURIComponent(query)}${
    address ? `&a=${encodeURIComponent(address)}` : ""
  }`;

  return fetch(url)
    .then(async (response) => {
      if (response.ok) {
        return response.json() as Promise<ApiEnterpriseData>;
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    })
    .then(({ entreprises }) => entreprises);
});

const searchEnterprises = debounce(apiEnterprises, 300);

export { searchEnterprises };
