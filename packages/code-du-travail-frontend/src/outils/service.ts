import { Tool } from "@socialgouv/cdtn-utils";
import { SITE_URL } from "../config";
import { getToolsByIdsAndSlugs } from "../api";

export type getToolsParams = {
  ids?: string[];
  slugs?: string[];
};

export const fetchTools = async ({ ids, slugs }: getToolsParams = {}): Promise<
  Tool[]
> => {
  let query = "";
  if (ids) {
    query += `ids=${ids.join(",")}`;
  }
  if (slugs) {
    query += query ? "&" : "";
    query += `slugs=${slugs.join(",")}`;
  }
  let result: any;
  if (process.env.NODE_ENV !== "production") {
    const response = await fetch(`${SITE_URL}/api/tools?${query}`);
    result = await response.json();
  } else {
    result = await getToolsByIdsAndSlugs(ids, slugs);
  }
  return result
    .map(({ _id, _source }) => ({ ..._source, _id }))
    .filter((tool) => tool.displayTool);
};

export const fetchTool = async (slug: string): Promise<Tool | undefined> => {
  const responseContainer = await fetch(`${SITE_URL}/api/tools/${slug}`);
  if (responseContainer.ok) {
    const result = await responseContainer.json();
    return { ...result._source, _id: result._id };
  }
};
