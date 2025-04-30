import { ElasticTool } from "@socialgouv/cdtn-types";
import { SITE_URL } from "../config";

export const fetchTool = async (
  slug: string
): Promise<ElasticTool | undefined> => {
  const responseContainer = await fetch(`${SITE_URL}/api/tools/${slug}`);
  if (responseContainer.ok) {
    const result = await responseContainer.json();
    return { ...result._source, _id: result._id };
  }
};
