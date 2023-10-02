import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";
import {
  Enterprise as ApiEntreprise,
  EnterpriseAgreement as ApiEnterpriseAgreement,
} from "../../../api/modules/enterprises/types";

export type Enterprise = ApiEntreprise;
export type EnterpriseAgreement = ApiEnterpriseAgreement;

const siretSirenError =
  "Veuillez indiquer un numéro Siret (14 chiffres) ou Siren (9 chiffres) valide";

const siretLengthError =
  "Veuillez indiquer un numéro Siret (14 chiffres obligatoire)";

const siretNumberError =
  "Veuillez indiquer un numéro Siret (14 chiffres uniquement)";

const apiEnterprises = function createFetcher(
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

  const url = `${SITE_URL}/api/enterprises?q=${encodeURIComponent(query)}${
    address ? `&a=${encodeURIComponent(address)}` : ""
  }`;

  return fetch(url).then(async (response) => {
    if (response.ok) {
      const res = await response.json();
      return res.entreprises;
    }
    if (response.status === 404 || !response.ok) {
      return { entreprises: [] };
    }
    return Promise.reject(
      "Ce service est momentanément indisponible. Vous pouvez tout de même poursuivre la simulation pour obtenir le résultat prévu par le code du travail en sélectionnant l'option \"Je ne souhaite pas renseigner ma convention collective (je passe l'étape)\""
    );
  });
};

const searchEnterprises = debounce(apiEnterprises, 300);

export { searchEnterprises };
