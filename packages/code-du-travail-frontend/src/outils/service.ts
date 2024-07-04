import { Tool } from "@socialgouv/cdtn-types";
import { getBySlugTools } from "../api";

type FetchTool = Partial<Tool>;

export const fetchTool = async (
  slug: string
): Promise<FetchTool | undefined> => {
  const result = await getBySlugTools(slug);
  return {
    ...result._source,
    _id: result._id,
  };
};
