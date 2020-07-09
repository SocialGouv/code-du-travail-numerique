const { SOURCES } = require("@socialgouv/cdtn-sources");

function getPrequalifiedBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.PREQUALIFIED },
        },
      },
    },
  };
}

module.exports = getPrequalifiedBody;
