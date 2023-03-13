import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getThemes, getThemeBySlugQuery } from "./queries";

export const getAllThemes = async () => {
  const body = getThemes();
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return {
    children: response.body.hits.hits.map((t) => t._source),
  };
};

export const getBySlugThemes = async (slug: string) => {
  const body = getThemeBySlugQuery(slug);

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.body.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no theme that match ${slug}`,
      name: "THEME_NOT_FOUND",
      cause: null,
    });
  }

  const theme = response.body.hits.hits[0];

  return {
    ...theme._source,
  };
};
