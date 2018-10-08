import { filterDocs, getNextQuestion } from "./walker";
import expandTags from "./expandTags";

// just wrap the walker API
const NextQuestion = ({ data, filters, render }) => {
  const results = filterDocs({ docs: expandTags(data), filters });
  // get best guess
  let question =
    results.length > 1 &&
    getNextQuestion({
      docs: results,
      filters,
      // list of tag to use
      // todo: automate
      tags: [
        "branche",
        "categorie",
        "travailleur_particulier",
        "critere_niveau",
        "profil",
        "theme",
        "type_contrat",
        "niveau",
        "region",
        "sousTheme",
        "type_entreprise"
      ]
    });
  return render({ question, results });
};

export default NextQuestion;
