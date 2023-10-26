import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";

import { nafError } from "./error";
import { Agreement } from "@socialgouv/cdtn-utils";

const formatCCn = ({
  num,
  id,
  slug,
  url,
  title,
  shortTitle,
  highlight,
  contributions,
}) => ({
  ...(highlight ? { highlight } : {}),
  ...(url ? { url } : {}),
  id,
  num,
  shortTitle,
  slug,
  title,
  contributions,
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
      let result = await response.json().then((results) => {
        return results.hits.hits.map(({ _source }) =>
          formatCCn(_source)
        ) as Agreement[];
      });
      const result3248 = result.find(({num}) => num === 3248);
      if (!result3248) {
        result = result.concat({
          "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000046993250",
          "id": "KALICONT000046993250",
          "num": 3248,
          "shortTitle": "Convention collective nationale de la métallurgie",
          "slug": "3248-convention-collective-nationale-de-la-metallurgie",
          "title": "Convention collective nationale de la métallurgie",
          "contributions": false
      })
      }
      return result;
    }
    return Promise.reject(
      "Ce service est momentanément indisponible. Vous pouvez tout de même poursuivre la simulation pour obtenir le résultat prévu par le code du travail en sélectionnant l'option \"Je ne souhaite pas renseigner ma convention collective (je passe l'étape)\""
    );
  });
};

const searchAgreements = debounce(apiIdcc, 300);

export { searchAgreements };
