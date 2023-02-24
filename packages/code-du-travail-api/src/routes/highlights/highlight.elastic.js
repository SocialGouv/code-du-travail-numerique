const { SOURCES } = require("cdtn-types");

function getHightlightsBody({ slug }) {
  return {
    query: {
      bool: {
        filter: [{ term: { source: SOURCES.HIGHLIGHTS } }, { term: { slug } }],
      },
    },
  };
}

module.exports = getHightlightsBody;
