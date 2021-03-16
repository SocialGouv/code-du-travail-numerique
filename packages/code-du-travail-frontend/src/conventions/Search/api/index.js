import { parseIdcc } from "@cdt/data";

import { CONVENTION_SEARCH } from "../searchHook";
import { searchConvention } from "./convention.service";
import { searchEntrepriseES } from "./entreprise.service";
import getQueryType from "./getQueryType";

// build a result list based on query type
export const getResults = async (query, address, searchType) => {
  const trimmedQuery = query.trim();

  let conventions = [];
  let entreprises = [];

  const type = getQueryType(query);

  if (searchType != CONVENTION_SEARCH) {
    entreprises = await searchEntrepriseES(trimmedQuery, address);
  } else {
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
  }

  return {
    conventions,
    entreprises,
  };
};
