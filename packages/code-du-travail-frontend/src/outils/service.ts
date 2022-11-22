import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export type getToolsParams = {
  ids?: string[];
  slugs?: string[];
};

export type Tool = {
  date: string;
  icon: string;
  order: number;
  action: string;
  metaTitle?: string;
  questions?: string[];
  description: string;
  displayTitle?: string;
  breadcrumbs: Record<string, string | number>[];
  cdtnId: string;
  excludeFromSearch: boolean;
  id: string;
  isPublished: boolean;
  metaDescription: string;
  slug: string;
  source: string;
  text: string;
  title: string;
  title_vector: number[];
  _id: string;
  enable?: boolean;
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
