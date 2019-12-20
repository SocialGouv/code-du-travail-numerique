import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import memoizee from "memoizee";
import debounce from "debounce-promise";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const formatCCn = ({ idcc: num, id, slug, title, shortTitle }) => ({
  id,
  slug,
  title,
  shortTitle,
  num
});

// memoize search results
const apiIdcc = memoizee(
  query => {
    const url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response
          .json()
          .then(results =>
            results.hits.hits.map(({ _source }) => formatCCn(_source))
          );
      }
      throw new Error("Un problème est survenu.");
    });
  },
  { promise: true }
);

// debounced versions

const searchConvention = debounce(apiIdcc, 300);

export { searchConvention };
