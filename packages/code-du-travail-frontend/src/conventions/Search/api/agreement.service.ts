import debounce from "debounce-promise";
import { SITE_URL } from "../../../config";

import { Agreement } from "../../../outils/types";

const formatCCn = ({ num, id, slug, title, shortTitle, highlight, url }) => ({
  ...(highlight ? { highlight } : {}),
  id,
  num,
  url,
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
    return Promise.reject("Ce service est momentanément indisponible.");
  });
};

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement, apiIdcc };
