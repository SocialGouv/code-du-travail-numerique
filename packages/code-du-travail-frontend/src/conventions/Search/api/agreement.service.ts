import debounce from "debounce-promise";
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

const apiIdcc = function createFetcher(query: string): Promise<Agreement[]> {
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
};

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement };
