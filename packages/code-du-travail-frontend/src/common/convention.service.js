import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "../lib/pDebounce";

const {
  publicRuntimeConfig: { API_URL, API_SIRET2IDCC_URL, API_DILA2SQL_URL }
} = getConfig();

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

function searchCompanies(siret) {
  const url = `${API_SIRET2IDCC_URL}/api/v1/companies?siret=${encodeURIComponent(
    siret.replace(/ /g, "")
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

const fetchTextes = ({ conteneurId, typeTextes }) => {
  const url = `${API_DILA2SQL_URL}/base/KALI/conteneur/${conteneurId}/textes/${typeTextes}`;
  return fetch(url)
    .then(r => r.json())
    .then(res => res.textes);
};

const fetchTexte = ({ id }) => {
  const url = `${API_DILA2SQL_URL}/base/KALI/texte/${id}`;
  return fetch(url).then(r => r.json());
};

// memoize search results
const searchIdccMemo = memoizee(query => searchIdcc(query), { promise: true });
const searchCompaniesMemo = memoizee(siret => searchCompanies(siret), {
  promise: true
});
const getCompanyMemo = memoizee(siret => getCompany(siret), { promise: true });

const searchCompaniesDebounced = pDebounce(searchCompaniesMemo, 800);

export {
  searchIdccMemo as searchIdcc,
  searchIdcc as _searchIdcc,
  searchCompaniesDebounced as searchCompanies,
  searchCompanies as _searchCompanies,
  getCompanyMemo as getCompany,
  getCompany as _getCompany,
  fetchTexte,
  fetchTextes
};
