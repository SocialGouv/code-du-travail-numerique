const { SOURCES } = require("@socialgouv/cdtn-utils");

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
