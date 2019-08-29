import React from "react";
import data from "@cdt/data...preavis-demission/data.json";

export const ccCriterionName = "branche";

// humanize questions
export const questions = {
  [ccCriterionName]: "Quelle est votre convention collective ?",
  catégorie: "Quelle est la catégorie professionnelle du salarié ?",
  ancienneté: "Quelle est l'ancienneté du salarié ?",
  groupe: "Quel est le groupe du salarié ?",
  coefficient: "Quel est le coefficient hiérarchique  du salarié ?",
  echelon: "Quel est l'échelon du salarié ?"
};

export const labels = {
  [ccCriterionName]: "convention collective",
  catégorie: "catégorie professionnelle",
  ancienneté: "ancienneté",
  groupe: "groupe",
  coefficient: "coefficient hiérarchique",
  echelon: "échelon"
};

export function getRecapLabel([key, value]) {
  const displayedValue = `${value}`.replace(/[0-9]+\|/, "").trim();
  switch (key) {
    case "catégorie":
      return (
        <>
          appartenant à la catégorie <strong>{displayedValue}</strong>
        </>
      );
    case "ancienneté":
      return (
        <>
          ayant <strong>{displayedValue}</strong> d’ancienneté
        </>
      );
    case "groupe":
      return (
        <>
          dans le groupe <strong>{displayedValue}</strong>
        </>
      );
    case "coefficient":
      return (
        <>
          avec un coefficient <strong>{displayedValue}</strong>
        </>
      );
    case "echelon":
      return (
        <>
          avec un échelon de <strong>{displayedValue}</strong>
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
        [data.criteria[ccCriterionName].id]:
          data.criteria[ccCriterionName].label
      }),
      {}
    )
  ).sort(([, a], [, b]) => a.localeCompare(b));
  return o;
}

const createValuesMatcher = values => ({ criteria }) =>
  Object.entries(values).every(([key, value]) => {
    // special case for branche
    if (key === ccCriterionName) {
      return criteria[key].id === value;
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
      criterion =>
        !Object.hasOwnProperty.call(values, criterion) && !values[criterion]
    );
    for (const criterion of availableCriteria) {
      state[criterion] = (state[criterion] || 0) + 1;
    }
    return state;
  }, {});

  const [criterion] = Object.entries(dupCriteria).sort(
    ([critA, countA], [critB, countB]) => {
      if (countA === countB) {
        if (critA === ccCriterionName) {
          return -1;
        } else if (critB === ccCriterionName) {
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
  if (nextQuestionKey === ccCriterionName) {
    return getCCList();
  }
  const dupValues = possibleSituations.map(
    ({ criteria }) => criteria[nextQuestionKey]
  );
  return [...new Set(dupValues)]
    .filter(Boolean)
    .sort((a, b) => {
      const [, numA] = a.match(/([0-9]+)\|/) || [];
      const [, numB] = b.match(/([0-9]+)\|/) || [];
      return numA && numB ? numA - numB : a.localeCompare(b);
    })
    .map(a => [a, a.replace(/[0-9]+\|/, "").trim()]);
}

export function getPastQuestions(values) {
  const questions = {};
  const answers = [];
  let situations = filterSituations(questions);
  let questionKey = getNextQuestionKey(situations, questions);

  while (Object.prototype.hasOwnProperty.call(values, questionKey)) {
    questions[questionKey] = values[questionKey];
    answers.push([questionKey, getOptions(situations, questionKey)]);

    situations = filterSituations(questions);
    questionKey = getNextQuestionKey(situations, questions);
  }
  return answers;
}

export function recapSituation(criteria) {
  return Object.entries(criteria)
    .filter(([key]) => key !== ccCriterionName)
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
