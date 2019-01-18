const synonyms = require("../synonyms.json");
const thesaurus = require("../thesaurus/TESS.json");

const thesaurusSynonyms = thesaurus
  .filter(({ term, equivalent }) => term && equivalent)
  .map(({ term, equivalent }) => `${term}, ${equivalent}`);

module.exports = [...synonyms, ...thesaurusSynonyms];

if (module === require.main) {
  console.log(JSON.stringify(thesaurusSynonyms, null, 2));
}
