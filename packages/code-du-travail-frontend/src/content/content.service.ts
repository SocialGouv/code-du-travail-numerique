import { API_URL } from "../config";

export const getContentById = async (id: string): Promise<any> => {
  const responseContainer = await fetch(`${API_URL}/items/${id}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};

export const getContents = async ({ ids }: { ids: string[] }): Promise<any> => {
  const responseContainer = await fetch(
    `${API_URL}/items?ids=${ids.join(",")}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};
