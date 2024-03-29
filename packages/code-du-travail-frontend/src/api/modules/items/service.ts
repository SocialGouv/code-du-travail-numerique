import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getDocumentBody, getSearchBySourceSlugBody } from "./queries";
import { getRelatedItems } from "./utils";

export const getBySourceAndSlugItems = async (source: any, slug: string) => {
  const body = getSearchBySourceSlugBody({ slug, source });
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      name: "ITEMS_NOT_FOUND",
      message: `There is no documents that match ${slug} in ${source}`,
      cause: null,
    });
  }

  const item = response.body.hits.hits[0];

  const {
    _id,
    _source: { title, covisits },
  } = item;

  const relatedItems = await getRelatedItems({
    covisits,
    settings: [{ _id }],
    slug,
    title,
  });

  delete item._source.title_vector;
  delete item._source.covisits;

  return {
    ...item,
    relatedItems,
  };
};

export const getAll = async (url: string) => {
  const body = getDocumentBody(url);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      name: "ITEMS_NOT_FOUND",
      message: `There is no document that match the query`,
      cause: null,
    });
  }

  return response.body.hits.hits;
};
