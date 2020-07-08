const { SOURCES } = require("@cdt/sources");

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
