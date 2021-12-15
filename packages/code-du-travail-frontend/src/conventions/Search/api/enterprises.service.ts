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
  address?: string;
  firstMatchingEtablissement?: MatchingEtablissement;
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

const siretSirenError =
  "Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide";

const siretLengthError =
  "Veuillez indiquer un numéro Siret (14 chiffres obligatoire)";

const siretNumberError =
  "Veuillez indiquer un numéro Siret (14 chiffres uniquement)";

const ENTERPRISE_API_URL =
  // TODO: restore "https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1";
  "https://search-recherche-entreprises.fabrique.social.gouv.fr/api/v1";

const makeSearchUrl = ({ query, address }) => {
  // todo : remove legacy params q and a
  return `${ENTERPRISE_API_URL}/search?query=${encodeURIComponent(
    query
  )}&q=${encodeURIComponent(query)}${
    address
      ? `&address=${encodeURIComponent(address)}&a=${encodeURIComponent(
          address
        )}`
      : ""
  }&onlyWithConvention=true&employer=true&open=true`;
};

const apiEnterprises = memoizee(function createFetcher(query, address) {
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

  const url = makeSearchUrl({ address, query });

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
    .then((result) => {
      return result.entreprises;
    });
});

const searchEnterprises = debounce(apiEnterprises, 300);

export { searchEnterprises };
