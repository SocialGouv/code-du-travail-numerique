import React from "react";

import Progression from "./Progression";
import Question from "./Question";
import Filters from "./Filters";
import NextQuestion from "./NextQuestion";

// questions affichées par tag
const tagsPolites = {
  theme: "Quel est le thème de votre question ?",
  sousTheme: "Pouvez-vous préciser le thème ?",
  branche: "De quelle branche professionelle s'agit-il ?",
  type_contrat: "Pour quel type de contrat ?",
  type_entreprise: "Pour quel type d'entreprise ?",
  region: "Dans quelle région ?",
  profil: "Quel est votre statut ?",
  categorie: "De quelle catégorie d'employé s'agit-il ?",
  critere_niveau: "Pour quel niveau ?",
  travailleur_particulier: "Travailleur particulier"
};

const tagsLabels = {
  theme: "Thème",
  sousTheme: "Sous-thème",
  categorie: "Catégorie",
  branche: "Branche professionelle",
  type_contrat: "Type de contrat",
  type_entreprise: "Type d'entreprise",
  region: "Région",
  profil: "Statut",
  critere_niveau: "Niveau",
  travailleur_particulier: "Travailleur particulier"
};

// valeurs affichée des tags
const tagsValueLabel = {
  branche: {
    boulangerie: "Boulangerie",
    metallurgie: "Métallurgie",
    proprete: "Propreté"
  },
  type_entreprise: {
    artisanal: "Entreprise artisanale",
    industriel: "Entreprise industrielle"
  }
};

// bouton "Autres"
export const tagsFallbacks = {
  region: "Autres régions"
};

const sum = array => array.reduce((a, c) => a + c, 0);
const politify = tag => tagsPolites[tag] || `${tag} ?`;
const getTagFallbackLabel = tag => tagsFallbacks[tag] || "Autres";
const getTagLabel = tag => tagsLabels[tag] || tag;
const getTagValueLabel = (tag, value) =>
  (tagsValueLabel[tag] && tagsValueLabel[tag][value]) || value;

// sanitize filter for selection (restore internal value)
// region: Autres régions -> null
// type_entreprise: Boulangerie industrielle -> industriel
const getFilterAnswer = (tag, answer) => {
  const isFallbackValue = answer === tagsFallbacks[tag];
  if (isFallbackValue || answer === "Autres") {
    return null;
  }
  const rawValue =
    (tagsValueLabel[tag] &&
      Object.keys(tagsValueLabel[tag]).find(
        key => tagsValueLabel[tag][key] === answer
      )) ||
    answer;
  return rawValue;
};

// label for a selected tag
const getKeyAndLabel = (filters, key) =>
  getTagLabel(key) +
  ": " +
  (getTagValueLabel(key, filters[key]) || getTagFallbackLabel(key));

//
// [experimental]
//
// guess next question, display question and show progression
// use a render props with the current data
//
// Filters: manage state for a selection of "filters"
// NextQuestion: provide next question for given docs and filters
// Progression: display current filters selection
// Question: display the question and choices
//
//
const DecisionTree = ({ data, filters = {}, render }) => (
  <Filters
    filters={filters}
    render={({ addFilter, removeFilter, resetFilters, filters }) => (
      <NextQuestion
        data={data}
        filters={filters}
        render={({ question, results }) => {
          const answers =
            question &&
            Object.keys(question.values).map(value =>
              getTagValueLabel(question.tag, value)
            );
          if (answers) {
            // number of documents covered by presented tags
            const sumDocsByAnswer = sum(Object.values(question.values));
            // if we need a "Autres" button
            if (sumDocsByAnswer < results.length) {
              answers.push(getTagFallbackLabel(question.tag));
            }
          }

          return (
            <div>
              <Progression
                onFilterClick={removeFilter}
                filters={filters}
                getLabel={key => getKeyAndLabel(filters, key)}
              />
              {question && (
                <Question
                  text={politify(question.tag)}
                  answers={answers}
                  onClick={answer =>
                    addFilter(
                      question.tag,
                      getFilterAnswer(question.tag, answer)
                    )
                  }
                />
              )}
              {render({
                results,
                filters
              })}
            </div>
          );
        }}
      />
    )}
  />
);

export default DecisionTree;
