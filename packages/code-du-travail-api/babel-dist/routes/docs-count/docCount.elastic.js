"use strict";
const { SOURCES } = require("@socialgouv/cdtn-sources");

module.exports = {
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
        order: { _key: "asc" }, // to be changed if we ever have more than 100 different
        // type of sources
        size: 100,
      },
    },
  },
  size: 0,
};
