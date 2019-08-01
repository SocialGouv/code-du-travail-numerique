import debounce from "debounce-promise";
import memoize from "memoizee";
import Fuse from "fuse.js";

import kali from "@socialgouv/kali-data/data/index.json";

import getQueryType from "./getQueryType";

// parametres fuse.js pour le search texte
const fuseCCNames = new Fuse(kali, {
  threshold: 0.2,
  shouldSort: true,
  matchAllTokens: true,
  tokenize: true,
  findAllMatches: true,
  keys: ["titre"]
});

// parametres fuse.js pour le search IDCC
const fuseCCIds = new Fuse(kali, {
  threshold: 0.1,
  location: 0,
  distance: 10,
  shouldSort: true,
  keys: ["num"]
});

// format results API Sirene. embed the IDCC numbers at runtime
const formatResultEntreprise = async result => ({
  id: result.id,
  siret: result.siret,
  idcc: await apiSiret2idcc(result.siret),
  label: `${result.nom_raison_sociale} ${result.code_postal ||
    ""} ${result.libelle_commune || ""}`
});

// format a set of results API Sirene
const formatFullTextResults = apiData =>
  (apiData.etablissement &&
    apiData.etablissement.map &&
    Promise.all(apiData.etablissement.map(formatResultEntreprise))) ||
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
      .then(data => formatResultEntreprise(data.etablissement)),
  { promise: true }
);

// api siret2idcc call
const apiSiret2idcc = memoize(
  async siret =>
    await fetch(`https://siret2idcc.incubateur.social.gouv.fr/api/v1/${siret}`)
      .then(r => r.json())
      .then(data => (data.error && []) || data.idcc.filter(id => id !== "9999"))
      .catch(() => []),
  { promise: true }
);

// debounced versions
const searchByName = debounce(apiEntrepriseFullText, 300);
const searchBySiret = debounce(apiEntrepriseSiret, 300);

// build a result list based on query type
export const loadResults = async query => {
  const type = getQueryType(query);
  // when text, combine local CCNs search + API sirene fulltext
  if (type === "text") {
    const results = [];
    // local CCNS list search
    const ccs = fuseCCNames.search(query.trim());
    if (ccs && ccs.length) {
      results.push(
        ...ccs.map(cc => ({
          id: cc.id,
          label: `IDCC ${cc.num}`,
          idcc: [cc.num]
        }))
      );
    }
    // fulltext search API Sirene
    const etablissements = await searchByName(query.trim());
    if (etablissements && etablissements.length) {
      results.push(...etablissements);
    }
    return results.filter(r => r.idcc && r.idcc.length);
    // direct search by siret with API sirene
  } else if (type === "siret") {
    const etablissement = await searchBySiret(query.trim());
    return [etablissement];
    // search local idcc list
  } else if (type === "idcc") {
    const matches = fuseCCIds.search(query.trim());
    // only show 1 result when perfect
    if (matches && matches.length && matches[0].num === query.trim()) {
      return [
        {
          id: query,
          label: `IDCC ${query}`,
          idcc: matches.map(match => match.num).slice(0, 1)
        }
      ];
    } else if (matches && matches.length) {
      // show first 5 results
      return [
        {
          id: query,
          label: `IDCC ${query}`,
          idcc: matches.map(match => match.num).slice(0, 5)
        }
      ];
    }
  }
  return null;
};
