const json2csv = require("json2csv");

const faq = require("../dataset/faq.json");
const faqConventionsCollectives = require("../dataset/faq-conventions-collectives.json");

const join = value => (Array.isArray(value) ? value.join(",") : value);

// flatten tags object values
const flatTags = tags =>
  tags &&
  Object.keys(tags).reduce((a, key) => ({ ...a, [key]: join(tags[key]) }), {});

// beautify some fields for CSV
const makeRows = (type, source) =>
  source.map(question => {
    const q = {
      type,
      ...question,
      // make columns for each tag
      ...flatTags(question.tags),
      // flatten
      themes: join(question.themes),
      articles: join(question.articles)
    };
    delete q.tags;
    return q;
  });

const fields = [
  "type",
  "question",
  "reponse",
  "theme",
  "branche",
  "type_entreprise",
  "profil",
  "type_contrat",
  "sousTheme",
  "travailleur_particulier",
  "categorie",
  "critere_niveau",
  "particularismes",
  "themes",
  "articles"
];

const getFaqsCsv = () => {
  const json2csvParser = new json2csv.Parser({ fields });
  const csv = json2csvParser.parse([
    ...makeRows("faq", faq),
    ...makeRows("faq-conventions-collectives", faqConventionsCollectives)
  ]);
  return csv;
};

if (module === require.main) {
  console.log(getFaqsCsv());
}
