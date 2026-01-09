import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { ElasticExternalTool, ElasticTool } from "@socialgouv/cdtn-types";

export const fetchTools = async <K extends keyof ElasticTool>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
  }
): Promise<Pick<ElasticTool, K>[]> => {
  const baseFilters: Array<any> = [
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
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  const response = await elasticsearchClient.search<Pick<ElasticTool, K>>({
    query: {
      bool: {
        must: baseFilters,
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
  >(["description", "metaDescription", "metaTitle", "title", "displayTitle"], {
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
  if (!result) {
    throw new Error("Simulateur non trouvé");
  }
  return result;
};

export const fetchExternalTools = async <K extends keyof ElasticExternalTool>(
  fields: K[]
): Promise<Pick<ElasticExternalTool, K>[]> => {
  const response = await elasticsearchClient.search<
    Pick<ElasticExternalTool, K>
  >({
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
              source: SOURCES.EXTERNALS,
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
      message: `There is no externals tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};
