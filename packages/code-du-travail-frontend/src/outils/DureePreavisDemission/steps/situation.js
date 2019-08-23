import React from "react";
import data from "@cdt/data...preavis-demission/data.json";

// humanize questions
export const questions = {
  branche: "Quelle est votre convention collective ?",
  catégorie: "Quelle est la catégorie professionnelle du salarié ?",
  ancienneté: "Quelle est l'ancienneté du salarié ?",
  groupe: "Quel est le groupe du salarié ?",
  coefficient: "Quel est le coefficient hiérarchique  du salarié ?",
  echelon: "Quel est l'échelon du salarié ?"
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
  const displayedValue = `${value}`.replace(/[0-9]+ /, "");
  switch (key) {
    case "catégorie":
      return (
        <>
          appartenant à la catégorie <em>{displayedValue}</em>
        </>
      );
    case "ancienneté":
      return (
        <>
          avec <em>{displayedValue}</em> d’ancienneté
        </>
      );
    case "groupe":
      return (
        <>
          dans le groupe <em>{displayedValue}</em>
        </>
      );
    case "coefficient":
      return (
        <>
          avec un coefficient <em>{displayedValue}</em>
        </>
      );
    case "echelon":
      return (
        <>
          avec un échelon de <em>{displayedValue}</em>
        </>
      );
    default: {
      return displayedValue;
    }
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
  const dupCriteria = possibleSituations.reduce((state, { criteria }) => {
    const availableCriteria = Object.keys(criteria).filter(
      criterion => !values.hasOwnProperty(criterion) && !values[criterion]
    );
    for (const criterion of availableCriteria) {
      state[criterion] = (state[criterion] || 0) + 1;
    }
    return state;
  }, {});

  const [criterion] = Object.entries(dupCriteria).sort(
    ([critA, countA], [critB, countB]) => {
      if (countA === countB) {
        if (critA === "branche") {
          return -1;
        } else if (critB === "branche") {
          return 1;
        }
        return critB.localeCompare(critA);
      }
      return countB - countA;
    }
  );
  if (criterion) {
    return criterion[0];
  }
  return;
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
    .map(a => [a, a.replace(/[0-9]+ /, "")]);
}

export function getPastQuestions(values) {
  let questions = {};
  let answers = [];
  let situations = filterSituations(questions);
  let questionKey = getNextQuestionKey(situations, questions);

  while (values.hasOwnProperty(questionKey)) {
    questions[questionKey] = values[questionKey];
    answers.push([questionKey, getOptions(situations, questionKey)]);

    let situations = filterSituations(questions);
    questionKey = getNextQuestionKey(situations, questions);
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
