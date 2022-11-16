import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const getContentById = async (id: string): Promise<any> => {
  const responseContainer = await fetch(`${API_URL}/items/${id}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};
