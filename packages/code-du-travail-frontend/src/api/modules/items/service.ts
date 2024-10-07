import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getSearchBySourceSlugBody } from "./queries";
import { getRelatedItems } from "./utils";

export const getBySourceAndSlugItems = async <Type>(
  source: string,
  slug: string,
) => {
  const body = getSearchBySourceSlugBody({ slug, source });
  const response = await elasticsearchClient.search<Type>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
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
