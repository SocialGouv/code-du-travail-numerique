import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const getToolByIds = async (ids: string[]): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items?ids=${ids.join(",")}&all=true`
  );
  return await responseContainer.json();
};

export const getAllTools = async (): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items?source=outils&all=true`
  );
  const result = await responseContainer.json();
  return result.map(({ _id, _source }) => ({ ..._source, _id }));
};
