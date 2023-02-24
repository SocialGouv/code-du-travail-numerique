import { Tool } from "@socialgouv/cdtn-utils";
import { API_URL } from "../config";

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
  const responseContainer = await fetch(`${API_URL}/tools?${query}`);
  const result = await responseContainer.json();
  return result.map(({ _id, _source }) => ({ ..._source, _id }));
};

export const fetchTool = async (slug: string): Promise<Tool | undefined> => {
  const responseContainer = await fetch(`${API_URL}/tools/${slug}`);
  if (responseContainer.ok) {
    const result = await responseContainer.json();
    return { ...result._source, _id: result._id };
  }
};
