import getConfig from "next/config";
import memoizee from "memoizee";

const {
  publicRuntimeConfig: { API_URL, API_SIRET2IDCC_URL }
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

function searchCompanies(siret) {
  const url = `${API_SIRET2IDCC_URL}/api/v1/companies?siret=${encodeURIComponent(
    siret
  )}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(result => result.companies);
    }
    throw new Error("Un problème est survenu.");
  });
}

function getCompany(siret) {
  const url = `${API_SIRET2IDCC_URL}/api/v1/company/${siret}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json().then(result => result.company);
    }
    throw new Error("Un problème est survenu.");
  });
}

// memoize search results
const searchIdccMemo = memoizee(query => searchIdcc(query), { promise: true });
const searchCompaniesMemo = memoizee(siret => searchCompanies(siret), {
  promise: true
});
const getCompanyMemo = memoizee(siret => getCompany(siret), { promise: true });

export {
  searchIdccMemo as searchIdcc,
  searchIdcc as _searchIdcc,
  searchCompaniesMemo as searchCompanies,
  searchCompanies as _searchCompanies,
  getCompanyMemo as getCompany,
  getCompany as _getCompany
};
