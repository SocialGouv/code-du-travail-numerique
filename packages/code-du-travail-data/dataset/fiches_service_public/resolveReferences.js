const parseLegifranceUrl = require("./parseLegifranceUrl");

// replace given reference with normalized one(s)
const resolveReference = reference =>
  parseLegifranceUrl(reference.url) || [reference];

const flatten = arr => arr.reduce((a, c) => [...a, ...c], []);

// resolve fiche references for code-du-travail and conventions-collectives
const resolveReferences = fiche => ({
  ...fiche,
  refs: flatten(fiche.refs.map(resolveReference).filter(Boolean))
});

module.exports = resolveReferences;
