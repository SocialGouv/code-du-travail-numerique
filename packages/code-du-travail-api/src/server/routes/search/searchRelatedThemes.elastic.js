const { SOURCES } = require("@cdt/sources");

function getRelatedThemesBody(query) {
  return {
    size: 5,
    _source: ["title", "slug", "url"],
    query: {
      bool: {
        filter: {
          term: {
            source: `${SOURCES.THEMES}`
          }
        },
        must: {
          match: {
            title: {
              query: `${query}`,
              fuzziness: "auto"
            }
          }
        }
      }
    }
  };
}

module.exports = getRelatedThemesBody;
