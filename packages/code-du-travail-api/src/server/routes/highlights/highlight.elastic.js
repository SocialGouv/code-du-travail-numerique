const { SOURCES } = require("@cdt/sources");

function getHightlightsBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.HIGHLIGHTS },
        },
      },
    },
  };
}

module.exports = getHightlightsBody;
