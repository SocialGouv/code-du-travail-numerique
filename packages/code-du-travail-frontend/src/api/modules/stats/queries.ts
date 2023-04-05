import { SOURCES } from "@socialgouv/cdtn-utils";

export const getDocsCountQuery = () => ({
  aggs: {
    sources: {
      terms: {
        exclude: [
          SOURCES.SHEET_MT_PAGE,
          SOURCES.VERSIONS,
          SOURCES.HIGHLIGHTS,
          SOURCES.PREQUALIFIED,
        ],
        field: "source",
        order: {
          _key: "asc",
        },
        size: 100,
      },
    },
  },
  size: 0,
});
