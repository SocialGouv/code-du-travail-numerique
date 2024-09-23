import { SOURCES } from "@socialgouv/cdtn-utils";
import { elasticsearchClient, elasticDocumentsIndex } from "../../utils";
import { getSearchBySourceSlugBody } from "../items/queries";

export const getDossiers = async (slug: string) => {
  const body = getSearchBySourceSlugBody({
    slug,
    source: SOURCES.THEMATIC_FILES,
  });
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }

  const thematicFile = response.hits.hits[0]._source;

  return {
    ...thematicFile,
  };
};
