import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../api/utils";
import { Tool } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { ElasticTool } from "./type";

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

export const fetchTool = async (
  slug: string
): Promise<DocumentElasticResult<ElasticTool>> => {
  const result = await fetchDocument<
    ElasticTool,
    keyof DocumentElasticResult<ElasticTool>
  >(["description", "title"], {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.TOOLS } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  });
  if (!result || result) {
    throw new Error("Outils non trouvé");
  }
  return result;
};
