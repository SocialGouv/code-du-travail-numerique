const { SOURCES  } = require("@socialgouv/cdtn-sources");
function getGlossaryBody() {
    return {
        query: {
            bool: {
                filter: {
                    term: {
                        source: SOURCES.GLOSSARY
                    }
                }
            }
        }
    };
}
export default getGlossaryBody;

//# sourceMappingURL=glossary.elastic.js.map