const { SOURCES } = require("@socialgouv/cdtn-types");

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

export default getGlossaryBody;
