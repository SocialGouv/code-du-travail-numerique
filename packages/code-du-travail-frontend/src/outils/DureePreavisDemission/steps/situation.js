import React from "react";
import data from "@cdt/data...preavis-demission/data.json";

// humanize questions
export const questions = {
  branche: "Quelle est votre convention collective?",
  catégorie: "Quelle est la catégorie professionnelle ?",
  ancienneté: "Quelle est l'ancienneté ?",
  groupe: "Quel est votre groupe ?",
  coefficient: "Quel est le coefficient hiérarchique?",
  echelon: "Quel est votre échelon ?"
};

export const labels = {
  branche: "convention collective",
  catégorie: "catégorie professionnelle",
  ancienneté: "ancienneté",
  groupe: "groupe",
  coefficient: "coefficient hiérarchique",
  echelon: "échelon"
};

function getRecapLabel([key, value]) {
  switch (key) {
    case "catégorie":
      return (
        <>
          appartenant à la catégorie <em>{value}</em>
        </>
      );
    case "ancienneté":
      return (
        <>
          avec <em>{value}</em> d’ancienneté
        </>
      );
    case "groupe":
      return (
        <>
          dans le groupe <em>{value}</em>
        </>
      );
    case "coefficient":
      return (
        <>
          avec un coefficient <em>{value}</em>
        </>
      );
    case "echelon":
      return (
        <>
          avec un échelon de <em>{value}</em>
        </>
      );
    default: {
      return value;
    }
  }
}

function sortCriteria(a, b) {
  if (a === "branche") {
    return -1;
  } else if (b === "branche") {
    return 1;
  } else {
    return a.localeCompare(b);
  }
}

function getCCList() {
  const o = Object.entries(
    data.reduce(
      (state, data) => ({
        ...state,
        [data.criteria.branche.idcc]: data.criteria.branche.label
      }),
      {}
    )
  )
    .sort(([, a], [, b]) => a.localeCompare(b))
    .concat([["0000", "Je ne sais pas"]]);
  return o;
}

const createValuesMatcher = values => ({ criteria }) =>
  Object.entries(values).every(([key, value]) => {
    // special case for branche
    if (key === "branche") {
      return criteria[key].idcc === value;
    }
    return criteria[key] === value;
  });

export function filterSituations(values = {}) {
  const matchValues = createValuesMatcher(values);
  return data.filter(matchValues);
}

export function getNextQuestionKey(possibleSituations, values = {}) {
  const dupCriteria = possibleSituations
    .map(({ criteria }) => Object.keys(criteria))
    .reduce((state, value) => state.concat(value), []);

  const [criterion] = [...new Set(dupCriteria)]
    .filter(criteria => !values.hasOwnProperty(criteria) && !values[criteria])
    .sort(sortCriteria);

  return criterion;
}

export function getOptions(possibleSituations, nextQuestionKey) {
  if (nextQuestionKey === "branche") {
    return getCCList();
  }
  const dupValues = possibleSituations.map(
    ({ criteria }) => criteria[nextQuestionKey]
  );
  return [...new Set(dupValues)]
    .filter(Boolean)
    .sort()
    .map(a => [a, a]);
}

export function getPastQuestions(values) {
  let questions = {};
  let answers = [];
  for (const key of Object.keys(values).sort(sortCriteria)) {
    let situations = filterSituations(questions);
    questions[key] = values[key];
    answers.push([key, getOptions(situations, key)]);
  }
  return answers;
}

export function recapSituation(criteria) {
  return Object.entries(criteria)
    .filter(([key]) => key !== "branche")
    .reduce(
      (state, item) =>
        state ? (
          <>
            {state}, {getRecapLabel(item)}
          </>
        ) : (
          getRecapLabel(item)
        ),
      null
    );
}
