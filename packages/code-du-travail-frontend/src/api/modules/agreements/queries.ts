import { SOURCES } from "@socialgouv/cdtn-utils";

export const getAllAgreementsWithContributions = () => {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "source",
      "num",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { term: { contributions: true } },
        ],
      },
    },
    size: 100,
  };
};

export function getAgreementsBySlugs(slugs: string[]) {
  console.log("TOTO");
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { terms: { slug: slugs } },
        ],
      },
    },
    size: 100,
  };
}

export function getAgreementsByIds(ids: string[]) {
  console.log("TOTO");
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { terms: { cdtnId: ids } },
        ],
      },
    },
    size: 100,
  };
}

export const getAgreementBySlug = (slug: string) => {
  console.log("TOTO");
  return {
    _source: [
      "_id",
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
      "articlesByTheme",
      "source",
      "description",
      "answers",
      "contributions",
      "metaDescription",
      "num",
      "date_publi",
      "effectif",
      "id",
      "text",
    ],
    query: {
      bool: {
        filter: [{ term: { slug } }, { term: { source: SOURCES.CCN } }],
      },
    },
    size: 1,
  };
};
