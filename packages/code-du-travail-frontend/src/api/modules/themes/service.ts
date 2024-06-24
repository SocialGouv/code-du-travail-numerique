import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import {
  getAllThemesQuery,
  getThemeBySlugQuery,
  getThemeBySlugsQuery,
} from "./queries";

export const getAllThemes = async () => {
  const body: any = getAllThemesQuery();
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  return {
    children: response.hits.hits.map((t) => t._source),
  };
};

export const getAllThemesAndSubThemes = async () => {
  const body: any = getAllThemesQuery();
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  const themes = response.hits.hits.map((t) => t._source);
  // for each theme of themes, we need to get slug of children
  const childrenSlugs = themes.flatMap((theme) =>
    theme.children.map((child) => child.slug)
  );
  const data = await getBySlugsThemes(childrenSlugs).catch(() => {
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
  const body: any = getThemeBySlugQuery(slug);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no theme that match ${slug}`,
      name: "THEME_NOT_FOUND",
      cause: null,
    });
  }

  const theme = response.hits.hits[0];

  return {
    ...theme._source,
  };
};

export const getBySlugsThemes = async (slugs: string[]) => {
  const body: any = getThemeBySlugsQuery(slugs);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no theme that match ${slugs.join(",")}`,
      name: "THEME_NOT_FOUND",
      cause: null,
    });
  }

  const themes = response.hits.hits.map(({ _source }) => _source);

  return themes;
};
