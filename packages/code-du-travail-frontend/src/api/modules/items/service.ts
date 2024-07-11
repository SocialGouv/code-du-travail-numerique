import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getSearchBySourceSlugBody } from "./queries";
import { getRelatedItems } from "./utils";

export const getBySourceAndSlugItems = async <Type>(
  source: string,
  slug: string
) => {
  const body = getSearchBySourceSlugBody({ slug, source });
  const response = await elasticsearchClient.search<Type>({
    body,
    index: elasticDocumentsIndex,
  });

  const item = response.hits.hits[0];

  if (!item || !item._source) {
    return;
  }

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
