import debounce from "debounce-promise";
import fetch from "isomorphic-unfetch";
import memoizee from "memoizee";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

// memoize search results
const cdtnEntrepriseFullText = memoizee(
  (query, address) => {
    const add = address ? `&a=${address}` : "";
    const url = `${API_URL}/entreprises?q=${encodeURIComponent(query)}${add}`;

    return fetch(url).then(async (response) => {
      if (response.ok) {
        const { entreprises } = await response.json();
        return entreprises;
      } else if (response.status == 404) {
        return [];
      }

      throw new Error("Un problème est survenu.");
    });
  },
  { promise: true }
);

const searchEntrepriseES = debounce(cdtnEntrepriseFullText, 300);

export { searchEntrepriseES };
