import { DocumentElasticWithSource } from "@socialgouv/cdtn-types";
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
    throw new NotFoundError({
      name: "ITEMS_NOT_FOUND",
      message: `There is no documents that match ${slug} in ${source}`,
      cause: null,
    });
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
