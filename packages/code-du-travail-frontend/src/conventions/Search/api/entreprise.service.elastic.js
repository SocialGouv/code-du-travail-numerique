import debounce from "debounce-promise";
import fetch from "isomorphic-unfetch";
import memoizee from "memoizee";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

// memoize search results
const cdtnEntrepriseFullText = memoizee(
  (query) => {
    const url = `${API_URL}/entreprises?q=${encodeURIComponent(query)}`;

    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json().then(({ enterprises }) => enterprises);
      }
      throw new Error("Un problème est survenu.");
    });
  },
  { promise: true }
);

const searchEntrepriseByName = debounce(cdtnEntrepriseFullText, 300);

export {
  searchEntrepriseByName,
  // searchEntrepriseBySiret,
  // searchEntrepriseBySiren,
};
