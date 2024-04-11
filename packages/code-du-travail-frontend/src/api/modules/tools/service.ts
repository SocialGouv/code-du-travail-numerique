import { Tool } from "@socialgouv/cdtn-utils";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getAllInternalToolsQuery, getTools } from "./queries";

export const getAllInternalTools = async (): Promise<Tool[]> => {
  const body = getAllInternalToolsQuery();
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
  return response.body.hits.hits
    .map(({ _id, _source }) => ({ ..._source, _id }))
    .filter((tool) => tool.displayTool);
};

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

export const getToolsBySlugs = async (slug: string): Promise<Tool> => {
  const body = getTools(undefined, slug);
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
