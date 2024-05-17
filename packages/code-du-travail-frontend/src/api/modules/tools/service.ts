import { Tool } from "@socialgouv/cdtn-types";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getTools, getAllToolsQuery } from "./queries";
import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

export const getAllTools = async (): Promise<Tool[]> => {
  const body: any = getAllToolsQuery();
  const response = await elasticsearchClient.search<any>({
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
  return response.hits.hits
    .map(({ _id, _source }) => ({ ..._source, _id }))
    .filter((tool) => tool.displayTool);
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
): Promise<SearchHit<Tool>> => {
  const body: any = getTools(undefined, [slug]);
  const response = await elasticsearchClient.search<Tool>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOL_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits[0] as SearchHit<Tool>;
};
