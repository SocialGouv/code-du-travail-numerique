const { SOURCES } = require("@cdt/sources");

function getGlossaryBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.GLOSSARY },
        },
      },
    },
  };
}

module.exports = getGlossaryBody;
