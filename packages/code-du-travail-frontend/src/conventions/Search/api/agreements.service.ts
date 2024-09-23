import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";

import { nafError } from "./error";
import { Agreement } from "../../../outils/types";
import { messageFetchSearchCcOrEnterprise } from "./enterprises.service";

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
  return fetch(url)
    .then(async (response) => {
      if (response.ok) {
        let result = await response.json().then((results) => {
          return results.hits.hits.map(({ _source }) =>
            formatCCn(_source)
          ) as Agreement[];
        });
        return result;
      }
      throw new Error();
    })
    .catch(() => {
      return Promise.reject(messageFetchSearchCcOrEnterprise);
    });
};

const searchAgreements = debounce(apiIdcc, 300);

export { searchAgreements };
