import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";
import { Enterprise as ApiEntreprise } from "../../../api/modules/enterprises/types";
import { SearchParams } from "../../../outils/common/Agreement/EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

export type Enterprise = ApiEntreprise;

export const messageFetchSearchCcOrEnterprise =
  "Ce service est momentanément indisponible. Si vous utilisez un simulateur, vous pouvez tout de même poursuivre la simulation pour obtenir le résultat prévu par le Code du travail en sélectionnant l'option \"Je ne souhaite pas renseigner ma convention collective (je passe l'étape)\"";

const siretSirenError =
  "Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide";

const siretLengthError =
  "Veuillez indiquer un numéro Siret (14 chiffres obligatoire)";

const siretNumberError =
  "Veuillez indiquer un numéro Siret (14 chiffres uniquement)";

const apiEnterprises = function createFetcher(
  searchParams: SearchParams
): Promise<Enterprise[]> {
  if (/^\d{2,8}$/.test(searchParams.query.replace(/\s/g, ""))) {
    return Promise.reject(siretSirenError);
  }
  if (
    /^\d{10,13}$/.test(searchParams.query.replace(/\s/g, "")) ||
    /^\d{15,}$/.test(searchParams.query.replace(/\s/g, ""))
  ) {
    return Promise.reject(siretLengthError);
  }
  if (/\D+\d{14}/.test(searchParams.query.replace(/\s/g, ""))) {
    return Promise.reject(siretNumberError);
  }

  const url = `${SITE_URL}/api/enterprises?q=${encodeURIComponent(searchParams.query)}${
    searchParams.apiGeoResult
      ? `&cp=${encodeURIComponent(searchParams.apiGeoResult.selectedPostCode.join(","))}`
      : ""
  }`;

  return fetch(url)
    .then(async (response) => {
      if (response.ok) {
        const res = await response.json();
        return res.entreprises;
      }
      throw new Error();
    })
    .catch(() => {
      return Promise.reject(messageFetchSearchCcOrEnterprise);
    });
};

const searchEnterprises = debounce(apiEnterprises, 300);

export { searchEnterprises };
