import { elasticsearchClient, elasticSuggestionsIndex } from "../../utils";
import { getSuggestQuery } from "./queries";

const minQueryLength = 2;

export const getSuggestions = async (q: string, size = 8) => {
  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await elasticsearchClient.search<any>({
      index: elasticSuggestionsIndex,
      ...body,
    });

    console.log(JSON.stringify(body, null, 2));

    return response.hits.hits.map((t) => t._source.title);
  } else {
    return [];
  }
};
