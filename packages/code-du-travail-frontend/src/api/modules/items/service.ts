import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getSearchBySourceSlugBody } from "./queries";
import { getRelatedItems } from "./utils";

export const getBySourceAndSlugItems = async (source: any, slug: string) => {
  const body = getSearchBySourceSlugBody({ slug, source });
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      name: "ITEMS_NOT_FOUND",
      message: `There is no documents that match ${slug} in ${source}`,
      cause: null,
    });
  }

  const item = response.hits.hits[0];

  const { _id } = item;

  const relatedItems = await getRelatedItems({
    settings: [{ _id }],
    slug,
  });

  return {
    ...item,
    relatedItems,
  };
};
