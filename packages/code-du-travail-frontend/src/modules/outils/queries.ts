import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../api/utils";
import { Tool } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";

export const fetchAllTools = async <K extends keyof Tool>(
  fields: K[]
): Promise<Pick<Tool, K>[]> => {
  const response = await elasticsearchClient.search<Pick<Tool, K>>({
    query: {
      bool: {
        must: [
          {
            term: {
              isPublished: true,
            },
          },
          {
            term: {
              source: SOURCES.TOOLS,
            },
          },
          {
            term: {
              displayTool: true,
            },
          },
        ],
      },
    },
    size: 50,
    sort: [
      {
        order: {
          order: "asc",
        },
      },
    ],
    _source: fields,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};
