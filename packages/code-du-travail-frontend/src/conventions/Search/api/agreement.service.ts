import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";

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
  const url = `${SITE_URL}/api/idcc?q=${encodeURIComponent(query)}`;

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
    const errorMessage = (await response.json()).message;
    return Promise.reject(errorMessage);
  });
};

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement };
