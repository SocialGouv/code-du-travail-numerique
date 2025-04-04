import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";
import { DocumentElasticWithSource } from "@socialgouv/cdtn-types";

export const fetchRootThemes = async <K extends keyof ThemeElasticDocument>(
  fields: K[]
): Promise<Pick<ThemeElasticDocument, K>[]> => {
  const response = await elasticsearchClient.search<
    Pick<ThemeElasticDocument, K>
  >({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.THEMES } },
          { term: { isPublished: true } },
        ],
        must_not: { exists: { field: "breadcrumbs" } },
      },
    },
    sort: [{ position: { order: "asc" } }],
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map((t) => t._source)
    .filter((item) => item !== undefined);
};

export const fetchTheme = async <K extends keyof ThemeElasticDocument>(
  slug: string,
  fields: K[]
): Promise<Pick<ThemeElasticDocument, K> | undefined> => {
  const theme = await fetchDocument<
    DocumentElasticWithSource<ThemeElasticDocument>,
    keyof DocumentElasticResult<DocumentElasticWithSource<ThemeElasticDocument>>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { slug } },
          { term: { source: SOURCES.THEMES } },
          { term: { isPublished: true } },
        ],
      },
    },
  });
  return theme;
};
