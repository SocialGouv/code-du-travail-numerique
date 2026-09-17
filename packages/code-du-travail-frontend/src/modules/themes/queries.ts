import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticWithSource, DocumentRef } from "@socialgouv/cdtn-types";
import { DocumentElasticResult, fetchDocument } from "../documents";

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
    size: 100,
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

export const fetchSubThemes = async <K extends keyof ThemeElasticDocument>(
  slug: string,
  fields: K[]
): Promise<Pick<ThemeElasticDocument, K>[] | undefined> => {
  const response = await elasticsearchClient.search<
    Pick<ThemeElasticDocument, K>
  >({
    query: {
      bool: {
        filter: [
          { term: { "parentSlug.keyword": slug } },
          { term: { source: SOURCES.THEMES } },
          { term: { isPublished: true } },
        ],
      },
    },
    sort: [{ position: { order: "asc" } }],
    size: 100,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map((t) => t._source)
    .filter((item) => item !== undefined);
};

export type ThemeRefs = {
  slug: string;
  refs: Pick<DocumentRef, "slug" | "source">[];
};

type ThemeRefsSource = Pick<ThemeRefs, "slug"> &
  Partial<Pick<ThemeRefs, "refs">>;

/**
 * Tous les thèmes publiés avec l'ordre éditorial de leurs contenus : les
 * `refs` sont exportées triées par la position du contenu dans le thème
 * (cdtn-admin). Seuls le slug et la source de chaque ref sont chargés, c'est
 * ce qu'il faut pour trier une liste de documents (`sortByThemeOrder`).
 */
export const fetchThemesRefs = async (): Promise<ThemeRefs[]> => {
  const response = await elasticsearchClient.search<ThemeRefsSource>({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.THEMES } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1000,
    _source: ["slug", "refs.slug", "refs.source"],
    index: elasticDocumentsIndex,
  });
  // Un thème sans contenu n'a pas de clé `refs` dans la source filtrée.
  return response.hits.hits
    .map((t) => t._source)
    .filter((item) => item !== undefined)
    .map(({ slug, refs = [] }) => ({ slug, refs }));
};
