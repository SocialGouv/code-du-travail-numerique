const { SOURCES } = require("@socialgouv/cdtn-utils");

function getVersionsBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.VERSIONS },
        },
      },
    },
  };
}

module.exports = getVersionsBody;
