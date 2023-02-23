const { SOURCES } = require("@socialgouv/cdtn-types");

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
