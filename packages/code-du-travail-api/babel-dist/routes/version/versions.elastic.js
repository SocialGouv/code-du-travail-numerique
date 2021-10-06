"use strict";
const { SOURCES } = require("@socialgouv/cdtn-sources");

function getVersionsBody() {
  return {
    query: { bool: { filter: { term: { source: SOURCES.VERSIONS } } } },
  };
}
module.exports = getVersionsBody;
