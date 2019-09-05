import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import memoizee from "memoizee";
import debounce from "debounce-promise";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const formatIdcc = ({ idcc, id, slug, title }) => ({
  id,
  slug,
  title,
  num: `0000${idcc}`.slice(-4)
});

const getConventionTextes = memoizee(
  (conventionId, typeTextes) =>
    fetch(`${API_URL}/conventions/${conventionId}/${typeTextes}`).then(
      response => {
        if (response.ok) {
          return response.json().then(data => data._source);
        }
        throw new Error("Un problème est survenu.");
      }
    ),
  {
    promise: true
  }
);

// memoize search results
const apiIdcc = memoizee(
  query => {
    const url = `${API_URL}/idcc?q=${encodeURIComponent(
      query.replace(/ /g, "")
    )}`;

    return fetch(url).then(response => {
      if (response.ok) {
        return response
          .json()
          .then(results =>
            results.hits.hits.map(({ _source }) => formatIdcc(_source))
          );
      }
      throw new Error("Un problème est survenu.");
    });
  },
  { promise: true }
);

// debounced versions

const searchConvention = debounce(apiIdcc, 300);

export { getConventionTextes, searchConvention, formatIdcc };
