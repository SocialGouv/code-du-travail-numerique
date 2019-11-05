const { SOURCES } = require("@cdt/sources");

function getModeleBody() {
  return {
    _source: ["title", "slug", "description", "editor", "filename"],
    query: {
      bool: {
        filter: [
          {
            term: {
              source: SOURCES.LETTERS
            }
          }
        ]
      }
    }
  };
}

module.exports = getModeleBody;
