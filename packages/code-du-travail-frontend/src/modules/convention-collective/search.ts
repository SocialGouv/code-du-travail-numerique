import debounce from "debounce-promise";
import { nafError } from "./error";
import { SITE_URL } from "../../config";
import { Agreement } from "../outils/indemnite-depart/types";

const formatCCn = ({
  _source: { num, id, slug, title, shortTitle, highlight, url },
}) => ({
  ...(highlight ? { highlight } : {}),
  id,
  num,
  url,
  shortTitle,
  slug,
  title,
});

export const onlyNumberError =
  "Numéro d’identification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement.";

const apiIdcc = function createFetcher(
  query: string,
  isStrict = false
): Promise<Agreement[]> {
  if (/^\d{4}[A-Za-z]$/.test(query.replace(/\W/g, ""))) {
    return Promise.reject(nafError);
  }
  if (/^\d{5,}$/.test(query.replace(/^(\s+)|(\s+)$/g, ""))) {
    return Promise.reject(onlyNumberError);
  }
  let url = `${SITE_URL}/api/idcc?q=${encodeURIComponent(query)}`;

  if (/^\d+$/.test(query.replace(/\W/g, "")) && !isStrict) {
    url = `${SITE_URL}/api/idcc?q=${encodeURIComponent(parseInt(query.replace(/\W/g, "")))}&size=10`;
  }
  return fetch(url)
    .then(async (response) => {
      if (response.ok) {
        return response
          .json()
          .then((results) => results.hits.hits.map(formatCCn));
      }
      throw new Error();
    })
    .catch(() => {
      return Promise.reject("Ce service est momentanément indisponible.");
    });
};

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement };
