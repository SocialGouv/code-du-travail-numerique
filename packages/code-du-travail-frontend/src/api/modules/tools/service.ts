import { Tool } from "@socialgouv/cdtn-utils";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getTools, getToolBySlug } from "./queries";

export const getAllTools = async (): Promise<Tool[]> => {
  const body = getTools();
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.body.hits.hits;
};

export const getToolsByIds = async (cdtnIds: string[]): Promise<Tool[]> => {
  const body = getTools(undefined, undefined, cdtnIds);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.body.hits.hits;
};

export const getToolsBySlugs = async (slugs: string[]): Promise<Tool[]> => {
  const body = getTools(undefined, slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOLS_NOT_FOUND",
      cause: null,
    });
  }
  return response.body.hits.hits;
};

export const getBySlugTools = async (slug: string): Promise<Tool> => {
  const body = getToolBySlug(slug);
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no tools that match query`,
      name: "TOOL_NOT_FOUND",
      cause: null,
    });
  }
  return response.body.hits.hits[0] as Tool;
};
