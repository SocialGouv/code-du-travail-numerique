const { SOURCES } = require("cdtn-types");

/**
 * This query is intended to work on theme index
 * @param  {string} a string to match
 * @param {number} maximum number of returned elements
 * @returns {Array} an array of theme documents
 */
function getRelatedThemesBody({ query, size = 5 }) {
  return {
    _source: ["icon", "title", "slug", "url", "source", "cdtnId"],
    query: {
      bool: {
        filter: [
          { term: { source: `${SOURCES.THEMES}` } },
          { term: { isPublished: true } },
        ],
        must: {
          match: {
            title: {
              fuzziness: "auto",
              query: `${query}`,
            },
          },
        },
        should: {
          match: {
            "breadcrumbs.label": {
              fuzziness: "auto",
              query: `${query}`,
            },
          },
        },
      },
    },
    size,
  };
}

module.exports = getRelatedThemesBody;
