const cdtn_synonyms = require("./cdtn_synonyms.json");
const thesaurus = require("./TESS.json");

const thesaurusSynonyms = thesaurus
  .filter(
    ({ term, equivalent }) =>
      term && equivalent && !Number.isInteger(parseInt(equivalent, 10))
  )
  .map(({ term, equivalent }) => `${term}, ${equivalent}`);

function format(str) {
  if (/=>/.test(str)) {
    return str;
  }
  const [abbrev, ...tokens] = str
    .split(",")
    .sort((a, b) => a.length > b.length)
    .map(t => t.trim());
  return `${[...tokens, abbrev].join(", ")} => ${abbrev}`;
}

const synonyms = [...cdtn_synonyms, ...thesaurusSynonyms]
  .map(str => format(str).toLowerCase())
  .sort();

module.exports = synonyms;

if (module === require.main) {
  console.log(JSON.stringify(synonyms, null, 2));
}
