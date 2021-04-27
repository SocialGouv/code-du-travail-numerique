import debounce from "debounce-promise";
import memoizee from "memoizee";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const formatCCn = ({ num, id, slug, title, shortTitle }) => ({
  id,
  num,
  shortTitle,
  slug,
  title,
});

// memoize search results
const apiIdcc = memoizee(
  (query) => {
    const url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;

    return fetch(url).then((response) => {
      if (response.ok) {
        return response
          .json()
          .then((results) =>
            results.hits.hits.map(({ _source }) => formatCCn(_source))
          );
      }
      throw new Error("Un problème est survenu.");
    });
  },
  { promise: true }
);

const searchConvention = debounce(apiIdcc, 300);

export { searchConvention };
