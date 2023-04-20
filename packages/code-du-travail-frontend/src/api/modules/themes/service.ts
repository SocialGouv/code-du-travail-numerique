import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getThemes, getThemeBySlugQuery, getAllThemesQuery } from "./queries";

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

export const getAllThemesAndSubThemes = async () => {
  const body = getAllThemesQuery();
  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  const themes = response.body.hits.hits.map((t) => t._source);
  // for each theme of themes, we need to get slug of children
  const childrenSlugs = themes.flatMap((theme) =>
    theme.children.map((child) => child.slug)
  );
  const data = await Promise.all(
    childrenSlugs.map((slug) => getBySlugThemes(slug))
  ).catch(() => {
    return [];
  });
  const themesWithChildren = themes.map((theme) => {
    const children = theme.children.map((child) => {
      const childWithContent = data.find((d: any) => d.slug === child.slug);
      return {
        ...child,
        ...childWithContent,
      };
    });
    return {
      ...theme,
      children,
    };
  });
  return themesWithChildren;
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
