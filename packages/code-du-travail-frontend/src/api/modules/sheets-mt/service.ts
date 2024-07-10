import { LaborCodeArticle } from "@socialgouv/cdtn-types";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getRelatedItems } from "../items";
import { getSheetMTQuery } from "./queries";

export const getSheetsMtService = async (slug: string) => {
  const body = getSheetMTQuery({ slug });
  const response = await elasticsearchClient.search<LaborCodeArticle>({
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

  if (!sheetMT || !sheetMT._source) {
    throw new NotFoundError({
      name: "AGREEMENT_NOT_FOUND",
      message: `there is no sheet mt that match ${slug}`,
      cause: null,
    });
  }

  const relatedItems = await getRelatedItems({
    settings: [{ _id: sheetMT._id }],
    slug,
  });

  return {
    ...sheetMT,
    relatedItems,
  };
};
