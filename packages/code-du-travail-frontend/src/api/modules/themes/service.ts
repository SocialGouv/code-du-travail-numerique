import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import {
  getRootThemesQuery,
  getThemeBySlugQuery,
  getThemeBySlugsQuery,
} from "./queries";
import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";

export const getRootThemes = async <K extends keyof ThemeElasticDocument>(
  fields: K[]
): Promise<Pick<ThemeElasticDocument, K>[]> => {
  const body = getRootThemesQuery();
  const response = await elasticsearchClient.search<
    Pick<ThemeElasticDocument, K>
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map((t) => t._source)
    .filter((item) => item !== undefined);
};

export const getBySlugThemes = async (slug: string) => {
  const body: any = getThemeBySlugQuery(slug);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    return;
  }

  const theme = response.hits.hits[0];

  return {
    ...theme._source,
  };
};

export const getBySlugsThemes = async <K extends keyof ThemeElasticDocument>(
  slugs: string[],
  fields: K[]
): Promise<Pick<ThemeElasticDocument, K>[]> => {
  const body: any = getThemeBySlugsQuery(slugs);

  const response = await elasticsearchClient.search<
    Pick<ThemeElasticDocument, K>
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((item) => item !== undefined);
};
