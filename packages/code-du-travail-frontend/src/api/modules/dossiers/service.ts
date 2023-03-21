import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getSearchBySourceSlugBody } from "../items/queries";

export const getDossiers = async (slug: string) => {
  const body = getSearchBySourceSlugBody({
    slug,
    source: SOURCES.THEMATIC_FILES,
  });
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no thematic files that match ${slug}`,
      name: "THEMATIC_FILES_NOT_FOUND",
      cause: null,
    });
  }

  const thematicFile = response.body.hits.hits[0]._source;

  return {
    ...thematicFile,
  };
};
