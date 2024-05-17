import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getHighlightsBySlug } from "./queries";

export const getBySlugHighlights = async (slug: string) => {
  const body = getHighlightsBySlug(slug);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no highlight that match ${slug}`,
      name: "HIGHLIGHT_NOT_FOUND",
      cause: null,
    });
  }

  return response.hits.hits[0]._source.refs;
};
