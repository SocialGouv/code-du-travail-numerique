const cdtn_synonyms = require("./cdtn_synonyms.json");
const thesaurus = require("./TESS.json");

const thesaurusSynonyms = thesaurus
  .filter(
    ({ term, equivalent }) =>
      term && equivalent && !Number.isInteger(parseInt(equivalent, 10))
  )
  .map(({ term, equivalent }) => `${term}, ${equivalent}`);

const synonyms = [...cdtn_synonyms, ...thesaurusSynonyms]
  .map(str => str.toLowerCase())
  .sort();

module.exports = synonyms;

if (module === require.main) {
  console.log(JSON.stringify(synonyms, null, 2));
}
