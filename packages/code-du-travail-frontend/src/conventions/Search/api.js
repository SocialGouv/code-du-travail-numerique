import getQueryType from "./getQueryType";
import { searchConvention } from "../convention.service";
import {
  searchEntrepriseByName,
  searchEntrepriseBySiret
} from "../entreprise.service";

const cleanIdcc = str => (str && str.replace(/^0+/, "").trim()) || "";
const formatIdcc = str => `0000${str}`.slice(-4);

// build a result list based on query type
export const loadResults = async query => {
  const type = getQueryType(query);
  // when text, combine local CCNs search + API sirene fulltext
  if (type === "text") {
    const results = [];
    // local CCNS list search
    // const ccs = fuseCCNames.search(query.trim());
    const ccns = await searchConvention(query.trim());
    if (ccns && ccns.length) {
      results.push(
        ...ccns.map(ccn => ({
          type: "convention",
          id: ccn.id,
          idcc: formatIdcc(ccn.idcc),
          conventions: [ccn]
        }))
      );
    }
    // fulltext search API Sirene
    const etablissements = await searchEntrepriseByName(query.trim());
    if (etablissements && etablissements.length) {
      results.push(
        ...etablissements.filter(r => r.conventions && r.conventions.length)
      );
    }
    return results;
    // direct search by siret with API sirene
  }
  if (type === "siret") {
    const etablissement = await searchEntrepriseBySiret(query.trim());
    return (etablissement && [etablissement]) || [];
    // search local idcc list
  }
  if (type === "idcc") {
    const matches = await searchConvention(cleanIdcc(query));

    // only show 1 result when perfect
    const perfectMatch =
      matches &&
      matches.length &&
      matches.find(match => cleanIdcc(match.num) === cleanIdcc(query));
    if (perfectMatch) {
      return [
        {
          type: "convention",
          id: query,
          label: `IDCC ${perfectMatch.num}`,
          conventions: [perfectMatch]
        }
      ];
    }
    // when multiple results from ES, show multiple CCs
    if (matches && matches.length) {
      // show first 5 results
      return matches.slice(0, 5).map(match => ({
        type: "convention",
        id: match.num,
        conventions: [match]
      }));
    }
  }
  return null;
};
