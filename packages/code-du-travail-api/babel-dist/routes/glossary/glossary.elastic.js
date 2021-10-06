"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const { SOURCES } = require("@socialgouv/cdtn-sources");

function getGlossaryBody() {
  return {
    query: { bool: { filter: { term: { source: SOURCES.GLOSSARY } } } },
  };
}
var _default = getGlossaryBody;
exports.default = _default;
