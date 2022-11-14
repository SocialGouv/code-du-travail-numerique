import getConfig from "next/config";
import { SOURCES } from "@socialgouv/cdtn-sources";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const getContentBySlug = async (slug: string): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};

export const getContentById = async (id: string): Promise<any> => {
  const responseContainer = await fetch(`${API_URL}/items/${id}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};
