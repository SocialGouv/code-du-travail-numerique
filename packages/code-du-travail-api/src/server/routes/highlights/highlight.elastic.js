const { SOURCES } = require("@socialgouv/cdtn-sources");

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
