const { SOURCES } = require("@socialgouv/cdtn-sources");

// if convention collectives are required
// we only return the one with contributions
const sourcesFilter = (sources) =>
  sources.includes(SOURCES.CCN)
    ? {
        bool: {
          should: [
            {
              terms: {
                boost: 1,
                source: sources.filter((s) => s != SOURCES.CCN),
              },
            },
            {
              bool: {
                must: [
                  { terms: { boost: 2, source: [SOURCES.CCN] } },
                  { term: { contributions: true } },
                  {
                    rank_feature: {
                      boost: 10,
                      field: "effectif",
                    },
                  },
                ],
              },
            },
          ],
        },
      }
    : { terms: { source: sources } };

module.exports = sourcesFilter;
