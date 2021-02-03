import { parseIdcc } from "@cdt/data";

import {
  ADRESSE_SEARCH,
  CONVENTION_SEARCH,
  ENTERPRISE_SEARCH,
  ENTERPRISE_SEARCH2,
} from "../searchHook";
import { searchConvention } from "./convention.service";
import {
  // searchEntrepriseByName,
  searchEntrepriseBySiren,
  searchEntrepriseBySiret,
} from "./entreprise.service";
import { searchEntrepriseES } from "./entreprise.service.elastic";
import getQueryType from "./getQueryType";

// build a result list based on query type
export const getResults = async (query, searchType) => {
  const trimmedQuery = query.trim();

  let conventions = [];
  let entreprises = [];

  const type = getQueryType(query);
  const cleaned = query.replace(/[\s .-]/g, "");

  if (
    [ENTERPRISE_SEARCH, ENTERPRISE_SEARCH2, ADRESSE_SEARCH].includes(searchType)
  ) {
    if (type === "text") {
      entreprises = await searchEntrepriseES(
        trimmedQuery,
        searchType
      ).then((entreprises) =>
        entreprises.filter(
          (entreprise) =>
            entreprise.conventions && entreprise.conventions.length
        )
      );

      // hack : group by convention for prototyping purpose
      if (searchType === ENTERPRISE_SEARCH2) {
        const flatConv = entreprises.flatMap((e) =>
          e.conventions.map((c) => [c, e])
        );

        conventions = flatConv.reduce((acc, [c, e]) => {
          const existingC = acc.find(({ num }) => num == c.num);
          if (existingC) {
            existingC.entreprises.push(e);
          } else {
            c.entreprises = [e];
            acc.push(c);
          }
          return acc;
        }, []);

        entreprises = [];
      }
    } else if (type === "siren") {
      entreprises = await searchEntrepriseBySiren(cleaned);
    } else if (type === "siret") {
      entreprises = await searchEntrepriseBySiret(cleaned);
    }
  } else if (searchType == CONVENTION_SEARCH) {
    if (type === "text") {
      conventions = await searchConvention(trimmedQuery);
    } else if (type === "idcc") {
      const matches = await searchConvention(parseIdcc(trimmedQuery));

      if (matches && matches.length) {
        const perfectMatch = matches.find(
          (match) => parseIdcc(match.num) === parseIdcc(trimmedQuery)
        );
        conventions = perfectMatch ? [perfectMatch] : matches.slice(0, 5);
      }
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
