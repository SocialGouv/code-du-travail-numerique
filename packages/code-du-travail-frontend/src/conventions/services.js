import getConfig from "next/config";
import memoizee from "memoizee";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function getConventionTextes(conventionId, typeTextes) {
  return fetch(`${API_URL}/conventions/${conventionId}/${typeTextes}`).then(
    response => {
      if (response.ok) {
        return response.json().then(data => data._source);
      }
      throw new Error("Un problème est survenu.");
    }
  );
}

const getConventionTextesMemo = memoizee(
  (conventionId, typeTextes) => getConventionTextes(conventionId, typeTextes),
  {
    promise: true
  }
);

function searchIdcc(query) {
  const url = `${API_URL}/idcc?q=${encodeURIComponent(
    query.replace(/ /g, "")
  )}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.hits.hits);
    }
    throw new Error("Un problème est survenu.");
  });
}

// memoize search results
const searchIdccMemo = memoizee(query => searchIdcc(query), { promise: true });

export {
  getConventionTextesMemo as getConventionTextes,
  getConventionTextes as _getConventionTextes,
  searchIdccMemo as searchIdcc,
  searchIdcc as _searchIdcc
};
