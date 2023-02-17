import { Tool } from "cdtn-types";
import {
  elasticIndex,
  elasticsearchClient,
  InternalServerError,
  NotFoundError,
} from "../utils";
import { getToolBySlug, getTools } from "./queries";

export class ToolsService {
  public async getAll(
    idsString?: string,
    slugsString?: string
  ): Promise<Tool[]> {
    const ids = idsString?.split(",");
    const slugs = slugsString?.split(",");
    const body = await getTools(ids, slugs);
    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    if (response.body.hits.total.value === 0) {
      throw new NotFoundError({
        message: `There is no tools that match query`,
        name: "TOOLS_NOT_FOUND",
        cause: null,
      });
    }
    return response.body.hits.hits;
  }

  public async getBySlug(slug: string): Promise<Tool> {
    const body = await getToolBySlug(slug);
    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    if (response.body.hits.total.value === 0) {
      throw new NotFoundError({
        message: `There is no tools that match query`,
        name: "TOOL_NOT_FOUND",
        cause: null,
      });
    }
    if (response.body.hits.total.value > 1) {
      throw new InternalServerError({
        message: `There is more than one tool that match query`,
        name: "TOO_MANY_TOOL_FOR_ONE_SLUG",
        cause: null,
      });
    }
    return response.body.hits.hits[0] as Tool;
  }
}
