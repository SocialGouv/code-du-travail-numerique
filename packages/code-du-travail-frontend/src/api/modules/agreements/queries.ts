import { SOURCES } from "@socialgouv/cdtn-sources";

export const getAllAgreementsWithContributions = () => {
  return {
    _source: ["title", "shortTitle", "description", "url", "slug", "source"],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
          { term: { contributions: true } },
        ],
      },
    },
    size: 200,
  };
};

export function getAgreementsBySlugs(slugs: string[]) {
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

export const getAgreementBySlugBody = (slug: string) => {
  return {
    query: {
      bool: {
        filter: [
          { term: { slug } },
          { term: { source: SOURCES.CCN } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  };
};
