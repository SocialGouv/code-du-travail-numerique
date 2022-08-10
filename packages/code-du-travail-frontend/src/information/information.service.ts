import getConfig from "next/config";
import { SOURCES } from "@socialgouv/cdtn-sources";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const getContentByIds = async (ids: string[]): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items?ids=${ids.join(",")}&all=true`
  );
  return await responseContainer.json();
};

export const getContentBySlug = async (slug: string): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};
