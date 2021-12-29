import debounce from "debounce-promise";
import memoizee from "memoizee";
import getConfig from "next/config";

import { nafError } from "./error";
import { Agreement } from "./type";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const formatCCn = ({ num, id, slug, title, shortTitle, highlight }) => ({
  ...(highlight ? { highlight } : {}),
  id,
  num,
  shortTitle,
  slug,
  title,
});
export const onlyNumberError =
  "Numéro d’indentification (IDCC) incorrect. Ce numéro est composé de 4 chiffres uniquement.";

// memoize search results
const apiIdcc = memoizee(
  function createFetcher(query) {
    if (/^\d{4}[A-Za-z]$/.test(query.replace(/\W/g, ""))) {
      return Promise.reject(nafError);
    }
    if (/^\d{5,}$/.test(query.replace(/^(\s+)|(\s+)$/g, ""))) {
      return Promise.reject(onlyNumberError);
    }
    let url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;

    if (/^\d+$/.test(query.replace(/\W/g, ""))) {
      url = `${API_URL}/idcc?q=${encodeURIComponent(
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
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    });
  },
  { promise: true }
);

const searchAgreements = debounce(apiIdcc, 300);

export { searchAgreements };
