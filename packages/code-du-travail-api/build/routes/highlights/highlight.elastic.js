const { SOURCES  } = require("@socialgouv/cdtn-sources");
function getHightlightsBody({ slug  }) {
    return {
        query: {
            bool: {
                filter: [
                    {
                        term: {
                            source: SOURCES.HIGHLIGHTS
                        }
                    },
                    {
                        term: {
                            slug
                        }
                    }
                ]
            }
        }
    };
}
module.exports = getHightlightsBody;

//# sourceMappingURL=highlight.elastic.js.map