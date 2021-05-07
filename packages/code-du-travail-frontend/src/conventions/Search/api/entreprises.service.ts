import debounce from "debounce-promise";
import memoizee from "memoizee";

import { Agreement } from "./convention.service";

export interface ApiEntrepriseData {
  entreprises: Entreprise[];
}

export interface Entreprise {
  activitePrincipale?: string;
  conventions: Convention[];
  etablissements: number;
  highlightLabel: string;
  label: string;
  matching: number;
  simpleLabel: string;
  siren: string;
  matchingEtablissement: MatchingEtablissement;
}

export interface Convention {
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

const apiEntreprises = memoizee(
  function createFetcher(search) {
    const url = `${ENTERPRISE_API_URL}?q=${encodeURIComponent(search.query)}${
      search.address ? `&a=${encodeURIComponent(search.address)}` : ""
    }`;

    return fetch(url)
      .then(async (response) => {
        if (response.ok) {
          return response.json() as Promise<ApiEntrepriseData>;
        }
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
      })
      .then(({ entreprises }) => entreprises);
  },
  // We use a normalizer because the fetcher argument
  // is an object that will change on each update and avoid memoization
  { normalizer: (args) => JSON.stringify(args[0]), promise: true }
);

const searchEntreprises = debounce(apiEntreprises, 300);

export { searchEntreprises };
