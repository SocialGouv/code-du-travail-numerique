import { SITE_URL } from "../config";

export const getContents = async ({ ids }: { ids: string[] }): Promise<any> => {
  const responseContainer = await fetch(
    `${SITE_URL}/api/items?ids=${ids.join(",")}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  return await responseContainer.json();
};
