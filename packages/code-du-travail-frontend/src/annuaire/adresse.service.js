import getConfig from "next/config";
import memoizee from "memoizee";
import debounce from "../lib/pDebounce";
const {
  publicRuntimeConfig: { API_ADDRESS }
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

const searchAddressMemo = memoizee(search, { promise: true, length: 1 });
const debounceSearchAddress = debounce(searchAddressMemo, 250);

export { debounceSearchAddress as searchAddress };
