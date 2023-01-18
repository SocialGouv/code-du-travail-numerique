import debounce from "debounce-promise";
import memoizee from "memoizee";
import { API_URL } from "../../../config";

import { Agreement } from "./type";

const formatCCn = ({ num, id, slug, title, shortTitle, highlight }) => ({
  ...(highlight ? { highlight } : {}),
  id,
  num,
  shortTitle,
  slug,
  title,
});

// memoize search results

const apiIdcc = memoizee(
  function createFetcher(query: string) {
    const url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;

    return fetch(url).then(async (response) => {
      if (response.ok) {
        return response
          .json()
          .then(
            (results) =>
              results.hits.hits.map(({ _source }) =>
                formatCCn(_source)
              ) as Agreement[]
          );
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    });
  },
  { promise: true }
);

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement };
