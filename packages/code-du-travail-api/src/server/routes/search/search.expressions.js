// todo : require(smthing)
const normalize = str =>
  str
    .toLowerCase()
    .replace(/[à]/g, "a")
    .replace(/[î]/g, "i")
    .replace(/[ô]/g, "o")
    .replace(/[éèê]/g, "e")
    .replace(/\s\s*/g, " ")
    .trim();

// expression should be normalized too
const expressions = [
  "rupture conventionnelle",
  "contrat de travail",
  "rupture anticipee",
  "licenciement collectif",
  "motif personnel",
  "remplacement d'un salarie",
  "assistante maternelle"
];

// return matched expressions in query if any
// expressions is a suite of some words.  eg: ["rupture conventionnelle", "contrat de travail"];
const getExpressions = query => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return [];
  }
  return expressions.filter(
    expression => normalizedQuery.indexOf(expression) > -1
  );
};

// return some additional ES filters for a given query
const getQueries = query =>
  getExpressions(query).map(expression => ({
    multi_match: {
      query: expression,
      fields: ["text.french", "title.french"],
      type: "phrase",
      boost: 1
    }
  }));

module.exports = getQueries;
