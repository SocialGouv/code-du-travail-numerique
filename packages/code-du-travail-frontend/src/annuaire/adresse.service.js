import getConfig from "next/config";
import memoizee from "memoizee";
import debounce from "p-debounce";
const {
  publicRuntimeConfig: { API_URL, API_ADDRESS }
} = getConfig();

function search(query) {
  const url = `${API_ADDRESS}/?q=${encodeURIComponent(
    query
  )}&type=housenumber&limit=5`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return [];
    }
    return response.json().then(results => results.features);
  });
}

function searchAnnuaireByQuery(query) {
  const url = `${API_URL}/annuaire/search?q=${encodeURIComponent(query)}`;
  return fetch(url).then(handleAnnaireResult);
}

function searchAnnuaireByCoord(coord) {
  const { lat, lon } = coord;
  const url = `${API_URL}/annuaire/search?coord=${lon}:${lat}`;
  return fetch(url).then(handleAnnaireResult);
}

function handleAnnaireResult(response) {
  if (!response.ok) {
    throw new Error(
      "Un problème est survenu lors de la requete des fiches annuaires"
    );
  }
  return response
    .json()
    .then(results => results.hits.hits.map(item => item._source));
}

const searchAddressMemo = memoizee(search, { promise: true, length: 1 });
const debounceSearchAddress = debounce(searchAddressMemo, 250);

export {
  debounceSearchAddress as searchAddress,
  searchAnnuaireByQuery,
  searchAnnuaireByCoord
};
