import { parseIdcc } from "@socialgouv/modeles-social";

import { searchAgreement } from "./agreement.service";
import {
  searchEntrepriseByName,
  searchEntrepriseBySiren,
  searchEntrepriseBySiret,
} from "./entreprise.service";
import getQueryType from "./getQueryType";

// build a result list based on query type
export const getResults = async (query) => {
  const trimmedQuery = query.trim();
  const type = getQueryType(query);

  let conventions = [];
  let entreprises = [];

  if (type === "text") {
    [conventions, entreprises] = await Promise.all([
      searchAgreement(trimmedQuery),
      searchEntrepriseByName(trimmedQuery).then((entreprises) =>
        entreprises.filter(
          (entreprise) =>
            entreprise.conventions && entreprise.conventions.length
        )
      ),
    ]);
  } else if (type === "siren") {
    entreprises = await searchEntrepriseBySiren(query.replace(/[\s .-]/g, ""));
  } else if (type === "siret") {
    entreprises = await searchEntrepriseBySiret(query.replace(/[\s .-]/g, ""));
  } else if (type === "idcc") {
    const matches = await searchAgreement(parseIdcc(trimmedQuery));

    if (matches && matches.length) {
      const perfectMatch = matches.find(
        (match) => parseIdcc(match.num) === parseIdcc(trimmedQuery)
      );
      conventions = perfectMatch ? [perfectMatch] : matches.slice(0, 5);
    }
  } else {
    return null;
  }
  return {
    conventions,
    entreprises: entreprises.filter(
      // we might want to remove this in a near future
      (entreprise) => !entreprise.closed && entreprise.conventions.length
    ),
  };
};
