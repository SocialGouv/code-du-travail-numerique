import debounce from "debounce-promise";
import memoize from "memoizee";

import getQueryType from "./getQueryType";
import { searchIdcc } from "../services";

const SIRET2IDCC_URL =
  process.env.API_SIRET2IDCC_URL ||
  "https://siret2idcc.incubateur.social.gouv.fr/api/v1";

// format results API Sirene. embed the IDCC numbers at runtime
const formatResultEntreprise = async result => ({
  id: result.id,
  siret: result.siret,
  conventions: await apiSiret2idcc(result.siret),
  label: `${result.nom_raison_sociale} ${result.code_postal ||
    ""} ${result.libelle_commune || ""}`
});

// format a set of results API Sirene
const formatFullTextResults = apiData =>
  (apiData.etablissement &&
    apiData.etablissement.map &&
    Promise.all(
      apiData.etablissement.filter(Boolean).map(formatResultEntreprise)
    )) ||
  Promise.resolve();

// api entreprise full text call
const apiEntrepriseFullText = memoize(
  async query =>
    await fetch(
      `https://entreprise.data.gouv.fr/api/sirene/v1/full_text/${encodeURIComponent(
        query
      )}`
    )
      .then(r => r.json())
      .then(formatFullTextResults)
      .catch(() => []),
  { promise: true }
);

// api entreprise siret call
const apiEntrepriseSiret = memoize(
  async siret =>
    await fetch(
      `https://entreprise.data.gouv.fr/api/sirene/v1/siret/${encodeURIComponent(
        siret
      )}`
    )
      .then(r => r.json())
      .then(
        data => data.etablissement && formatResultEntreprise(data.etablissement)
      ),
  { promise: true }
);

// api siret2idcc call
const apiSiret2idcc = memoize(
  async siret =>
    await fetch(`${SIRET2IDCC_URL}/${siret}`)
      .then(r => r.json())
      .then(
        data =>
          (data.error && []) ||
          data.filter(convention => convention.num !== "9999")
      )
      .catch(() => []),
  { promise: true }
);

// debounced versions
const searchByName = debounce(apiEntrepriseFullText, 300);
const searchBySiret = debounce(apiEntrepriseSiret, 300);

const idcc2num = ({ idcc, id, slug, title }) => ({
  id,
  slug,
  title,
  num: `0000${idcc}`.slice(-4)
});
// build a result list based on query type
export const loadResults = async query => {
  const type = getQueryType(query);
  // when text, combine local CCNs search + API sirene fulltext
  if (type === "text") {
    const results = [];
    // local CCNS list search
    // const ccs = fuseCCNames.search(query.trim());
    const ccns = await searchIdcc(query.trim());

    if (ccns && ccns.length) {
      results.push(
        ...ccns.map(({ _source, _source: { id, idcc } }) => ({
          id,
          label: "Convention collective",
          idcc: `0000${idcc}`.slice(-4),
          conventions: [idcc2num(_source)]
        }))
      );
    }
    // fulltext search API Sirene
    const etablissements = await searchByName(query.trim());
    if (etablissements && etablissements.length) {
      results.push(
        ...etablissements.filter(r => r.conventions && r.conventions.length)
      );
    }
    return results;
    // direct search by siret with API sirene
  }
  if (type === "siret") {
    const etablissement = await searchBySiret(query.trim());
    return (etablissement && [etablissement]) || [];
    // search local idcc list
  }
  if (type === "idcc") {
    // const matches = fuseCCIds.search(query.trim());
    const results = await searchIdcc(query.trim());

    const matches = results.map(({ _source }) => idcc2num(_source));
    // only show 1 result when perfect
    if (matches && matches.length && matches[0].idcc === query.trim()) {
      return [
        {
          id: query,
          label: `IDCC ${query}`,
          conventions: matches.slice(0, 1)
        }
      ];
    }
    if (matches && matches.length) {
      // show first 5 results
      return [
        {
          id: query,
          label: `IDCC ${query}`,
          conventions: matches.slice(0, 5)
        }
      ];
    }
  }
  return null;
};
