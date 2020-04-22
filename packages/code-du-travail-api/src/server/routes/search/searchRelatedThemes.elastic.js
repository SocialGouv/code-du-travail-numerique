const { SOURCES } = require("@cdt/sources");

/**
 * This query is intended to work on theme index
 * @param  {string} a string to match
 * @param {number} maximum number of returned elements
 * @returns {Array} an array of theme documents
 */
function getRelatedThemesBody({ query, size = 5 }) {
  return {
    size,
    _source: ["icon", "title", "slug", "url", "source"],
    query: {
      bool: {
        filter: {
          term: {
            source: `${SOURCES.THEMES}`,
          },
        },
        must: {
          match: {
            title: {
              query: `${query}`,
              fuzziness: "auto",
            },
          },
        },
        should: {
          match: {
            "breadcrumbs.label": {
              query: `${query}`,
              fuzziness: "auto",
            },
          },
        },
      },
    },
  };
}

module.exports = getRelatedThemesBody;
