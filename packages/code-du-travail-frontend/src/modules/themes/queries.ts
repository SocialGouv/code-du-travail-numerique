import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";

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
