import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../api/utils";
import { HighlightDocument } from "@socialgouv/cdtn-types";

const SLUG_HOME = "homepage";

export const fetchHighLights = async (): Promise<HighlightDocument["refs"]> => {
  const response = await elasticsearchClient.search<
    Pick<HighlightDocument, "refs">
  >({
    _source: ["refs"],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.HIGHLIGHTS } },
          { term: { slug: SLUG_HOME } },
        ],
      },
    },
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no highlight that match ${SLUG_HOME}`,
      name: "HIGHLIGHT_NOT_FOUND",
      cause: null,
    });
  }

  return response.hits.hits[0]._source?.refs ?? [];
};
