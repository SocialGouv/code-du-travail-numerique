import getConfig from "next/config";
import memoizee from "memoizee";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function search(query) {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    query
  )}&type=housenumber&limit=5`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.features);
    }
    throw new Error("impossible de contacter adresse-api.gouv.fr");
  });
}

function searchAnnuaireByQuery(query) {
  const url = `${API_URL}/annuaire/search?q=${encodeURIComponent(query)}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.hits.hits);
    }
    throw new Error(
      "Un problème est survenu lors de la requete des fiches annuaires"
    );
  });
}

function searchAnnuaireByCoord(coord) {
  const { lat, lon } = coord;
  const url = `${API_URL}/annuaire/search?coord=${lon}:${lat}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.hits.hits);
    }
    throw new Error(
      "Un problème est survenu lors de la requete des fiches annuaires"
    );
  });
}

function searchAnnuaire() {}

const searchAddressMemo = memoizee(query => search(query), { promise: true });

export {
  searchAddressMemo as searchAddress,
  search as _search,
  searchAnnuaireByQuery,
  searchAnnuaireByCoord,
  searchAnnuaire
};
