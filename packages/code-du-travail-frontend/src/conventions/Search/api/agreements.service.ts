import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";

import { nafError } from "./error";
import { Agreement } from "./type";

const formatCCn = ({ num, id, slug, url, title, shortTitle, highlight }) => ({
  ...(highlight ? { highlight } : {}),
  ...(url ? { url } : {}),
  id,
  num,
  shortTitle,
  slug,
  title,
});
export const onlyNumberError =
  "Numéro d’indentification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement.";

const apiIdcc = function createFetcher(query) {
  if (/^\d{4}[A-Za-z]$/.test(query.replace(/\W/g, ""))) {
    return Promise.reject(nafError);
  }
  if (/^\d{5,}$/.test(query.replace(/^(\s+)|(\s+)$/g, ""))) {
    return Promise.reject(onlyNumberError);
  }
  let url = `${SITE_URL}/api/idcc?q=${encodeURIComponent(query)}`;

  if (/^\d+$/.test(query.replace(/\W/g, ""))) {
    url = `${SITE_URL}/api/idcc?q=${encodeURIComponent(
      parseInt(query.replace(/\W/g, ""))
    )}`;
  }
  return fetch(url).then(async (response) => {
    if (response.ok) {
      return response.json().then((results) => {
        return results.hits.hits.map(({ _source }) =>
          formatCCn(_source)
        ) as Agreement[];
      });
    }
    return Promise.reject(
      "Ce service est momentanément indisponible. Vous pouvez tout de même poursuivre la simulation pour obtenir le résultat prévu par le code du travail en sélectionnant l'option \"Je ne souhaite pas renseigner ma convention collective (je passe l'étape)\""
    );
  });
};

const searchAgreements = debounce(apiIdcc, 300);

export { searchAgreements };
