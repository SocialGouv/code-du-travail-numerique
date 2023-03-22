import { elasticsearchClient, elasticDocumentsIndex } from "../../utils";
import { getSuggestQuery } from "./queries";

const minQueryLength = 2;

export const getSuggestions = async (q: string, size: number) => {
  if (q.length >= minQueryLength) {
    const body = getSuggestQuery(q, size);
    const response = await elasticsearchClient.search({
      body,
      index: elasticDocumentsIndex,
    });
    return response.body.hits.hits.map((t) => t._source.title);
  } else {
    return [];
  }
};
