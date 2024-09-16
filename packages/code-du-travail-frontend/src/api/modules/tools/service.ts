import { Tool } from "@socialgouv/cdtn-types";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getAllToolsQuery, getTools } from "./queries";
import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

export const getAllTools = async <K extends keyof Tool>(
  fields: K[]
): Promise<Pick<Tool, K>[]> => {
  const body: any = getAllToolsQuery();
  const response = await elasticsearchClient.search<Pick<Tool, K>>({
    ...body,
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

export const getToolsByIdsAndSlugs = async (
  ids?: string[],
  slugs?: string[]
): Promise<SearchHit<Tool>[]> => {
  const body: any = getTools(ids, slugs);
  const response = await elasticsearchClient.search<Tool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits;
};

export const getToolsByIds = async (
  cdtnIds: string[]
): Promise<SearchHit<Tool>[]> => {
  const body: any = getTools(undefined, undefined, cdtnIds);
  const response = await elasticsearchClient.search<Tool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits;
};

export const getToolsBySlugs = async (
  slugs: string[]
): Promise<SearchHit<Tool>[]> => {
  const body: any = getTools(undefined, slugs);
  const response = await elasticsearchClient.search<Tool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits;
};

export const getBySlugTools = async (
  slug: string
): Promise<Tool | undefined> => {
  const body: any = getTools(undefined, [slug]);
  const response = await elasticsearchClient.search<Tool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    return;
  }
  return response.hits.hits[0]._source;
};
