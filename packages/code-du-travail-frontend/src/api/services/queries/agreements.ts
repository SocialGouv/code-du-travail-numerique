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
