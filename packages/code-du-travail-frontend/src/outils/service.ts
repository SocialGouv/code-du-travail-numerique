import { Tool } from "cdtn-types";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

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

export const fetchTool = async (slug: string): Promise<Tool> => {
  const responseContainer = await fetch(`${API_URL}/items/outils/${slug}`);
  const result = await responseContainer.json();
  return { ...result._source, _id: result._id };
};
