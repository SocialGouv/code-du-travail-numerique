import React from "react";

const createValuesMatcher = values => item => {
  function swallowEqual(a, b) {
    return Object.entries(a).every(([key, value]) => {
      if (value && value.constructor === Object) {
        return swallowEqual(value, b[key]);
      }
      return `${b[key]}`.toLowerCase() === `${value}`.toLowerCase();
    });
  }
  return swallowEqual(values, item.criteria);
};

export function filterSituations(situations, criteria = {}) {
  const matchValues = createValuesMatcher(criteria);
  return situations.filter(matchValues);
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
        return critA.localeCompare(critB);
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
    .map(a => [a, a.replace(/([0-9]+\|)?/, "").trim()]);
}

export function getPastQuestions(initialSituations, criteria = {}) {
  const questions = {};
  const answers = [];

  let questionKey = getNextQuestionKey(initialSituations, questions);

  while (Object.prototype.hasOwnProperty.call(criteria, questionKey)) {
    questions[questionKey] = criteria[questionKey];
    answers.push([questionKey, getOptions(initialSituations, questionKey)]);

    initialSituations = filterSituations(initialSituations, questions);
    questionKey = getNextQuestionKey(initialSituations, questions);
  }
  return answers;
}

export function getSituationsFor(data, obj) {
  return data.filter(situation =>
    Object.entries(obj).every(([key, value]) => situation[key] === value)
  );
}

export const isNotYetProcessed = (data, idcc) => {
  const situtation = data.filter(situation => situation.idcc === idcc);
  return !situtation.length;
};

export function recapSituation(criteria) {
  const cleanValue = value => `${value}`.replace(/[0-9]+\|/, "").trim();
  const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");

  return (
    <ul>
      {Object.entries(criteria).map(([criteria, value]) => (
        <li key={criteria}>
          {capitalize(criteria)}: <strong>{cleanValue(value)}</strong>
        </li>
      ))}
    </ul>
  );
}
