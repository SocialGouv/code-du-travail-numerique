const { SOURCES } = require("@cdt/sources");

const _source = ["title", "slug", "description"];

function getRootToolsQuery() {
  return {
    _source,
    query: {
      bool: {
        filter: [
          {
            term: {
              source: SOURCES.TOOLS
            }
          }
        ]
      }
    }
  };
}

function getToolQuery({ slug }) {
  return {
    _source,
    size: 1,
    query: {
      bool: {
        filter: [
          {
            term: {
              source: SOURCES.TOOLS
            }
          }
        ],
        must: [
          {
            match: { slug }
          }
        ]
      }
    }
  };
}

module.exports = {
  getRootToolsQuery,
  getToolQuery
};
