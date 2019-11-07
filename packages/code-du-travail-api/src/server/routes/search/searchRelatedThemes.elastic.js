/**
 * This query is intended to work on theme index
 * @param  {string} a string to match
 * @param {number} maximum number of returned elements
 * @returns {Array} an array of theme documents
 */
function getRelatedThemesBody({ query, size = 5 }) {
  return {
    size,
    _source: ["title", "slug", "url", "source"],
    query: {
      bool: {
        should: [
          {
            match: {
              title: {
                query: `${query}`,
                fuzziness: "auto"
              }
            }
          },
          {
            match: {
              "breadcrumbs.title": {
                query: `${query}`,
                fuzziness: "auto"
              }
            }
          }
        ]
      }
    }
  };
}

module.exports = getRelatedThemesBody;
