import { SOURCES } from "@socialgouv/cdtn-utils";

export function getSheetMTQuery({ slug }) {
  return {
    _source: [
      "breadcrumbs",
      "date",
      "description",
      "intro",
      "sections",
      "slug",
      "title",
      "url",
      "cdtnId",
      "covisits",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.SHEET_MT_PAGE } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    },
  };
}
