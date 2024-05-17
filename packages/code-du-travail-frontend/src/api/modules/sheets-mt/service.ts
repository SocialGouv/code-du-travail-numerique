import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getRelatedItems } from "../items";
import { getSheetMTQuery } from "./queries";

export const getSheetsMtService = async (slug: string) => {
  const body = getSheetMTQuery({ slug });
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      name: "AGREEMENT_NOT_FOUND",
      message: `there is no sheet mt that match ${slug}`,
      cause: null,
    });
  }

  const sheetMT = response.hits.hits[0];

  const relatedItems = await getRelatedItems({
    covisits: sheetMT._source.covisits,
    settings: sheetMT._source.title,
    slug,
    title: sheetMT._source.title,
  });

  delete sheetMT._source.covisits;

  return {
    ...sheetMT,
    relatedItems,
  };
};
