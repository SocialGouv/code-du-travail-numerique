import debounce from "debounce-promise";
import memoizee from "memoizee";

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

const apiEnterprises = memoizee(function createFetcher(
  query: string,
  address?: string
) {
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
