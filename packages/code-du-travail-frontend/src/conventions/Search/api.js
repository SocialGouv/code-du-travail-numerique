import getQueryType from "./getQueryType";
import { searchConvention } from "../convention.service";
import {
  searchEntrepriseByName,
  searchEntrepriseBySiret
} from "../entreprise.service";

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
          id: ccn.id,
          label: "Convention collective",
          idcc: `0000${ccn.idcc}`.slice(-4),
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
    // const matches = fuseCCIds.search(query.trim());
    const matches = await searchConvention(query.trim());

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
