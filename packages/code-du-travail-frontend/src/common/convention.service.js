import getConfig from "next/config";
import memoizee from "memoizee";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function searchIdcc(query) {
  const url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.hits.hits);
    }
    throw new Error("Un problème est survenu.");
  });
}

// memoize search results
const searchIdccMemo = memoizee(query => searchIdcc(query), { promise: true });

export { searchIdccMemo as searchIdcc, searchIdcc as _searchIdcc };
