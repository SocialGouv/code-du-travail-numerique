import { elasticsearchClient, elasticSuggestionsIndex } from "../../utils";
import { getSuggestQuery } from "./queries";

const minQueryLength = 2;

export const getSuggestions = async (q: string, size = 5) => {
  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await elasticsearchClient.search<any>({
      body,
      index: elasticSuggestionsIndex,
    });
    return response.hits.hits.map((t) => t._source.title);
  } else {
    return [];
  }
};
