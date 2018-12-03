import memoizee from "memoizee";

function search(query) {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    query
  )}&type=housenumber`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(results => results.features);
    }
    throw new Error("impossible de contacter adresse-api.gouv.fr");
  });
}

const searchAddressMemo = memoizee(query => search(query), { promise: true });

export { searchAddressMemo as searchAddress, search as _search };
