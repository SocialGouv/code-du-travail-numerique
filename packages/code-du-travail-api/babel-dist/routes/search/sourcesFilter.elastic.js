"use strict";
const { SOURCES } = require("@socialgouv/cdtn-sources"); // if convention collectives are required
// we only return the one with contributions
const sourcesFilter = (sources) =>
  sources.includes(SOURCES.CCN)
    ? {
        bool: {
          should: [
            // contents other than CCN
            // we want a boost here to avoid noise from CCNs
            {
              terms: {
                boost: 30,
                source: sources.filter((s) => s != SOURCES.CCN),
              },
            }, // OR ( CCN source AND contributions )
            {
              bool: {
                must: [
                  { term: { source: SOURCES.CCN } },
                  { term: { contributions: true } },
                  { rank_feature: { boost: 10, field: "effectif" } },
                ],
              },
            },
          ],
        },
      }
    : { terms: { source: sources } };
module.exports = sourcesFilter;
