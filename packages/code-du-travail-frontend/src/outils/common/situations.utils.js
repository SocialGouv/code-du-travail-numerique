import React from "react";

const createValuesMatcher = (values) => (item) => {
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

export function getNextQuestionKey(
  possibleSituations,
  criteriaOrder,
  values = {}
) {
  const [criterion] = criteriaOrder
    .filter((criterion) =>
      possibleSituations.some((situation) => situation.criteria[criterion])
    )
    .filter((criterion) => !values[criterion]);
  return criterion;
}

export function getOptions(possibleSituations, nextQuestionKey) {
  const dupValues = possibleSituations.map(
    ({ criteria }) => criteria[nextQuestionKey]
  );
  return [...new Set(dupValues)]
    .filter(Boolean)
    .sort(orderCriteria)
    .map(formatOption);
}

export function orderCriteria(a, b) {
  const [, numA] = a.match(/([0-9]+)\|/) || [];
  const [, numB] = b.match(/([0-9]+)\|/) || [];
  return numA && numB ? numA - numB : a.localeCompare(b);
}

export function formatOption(a) {
  return [a, a.replace(/([0-9]+\|)?/, "").trim()];
}

export function getPastQuestions(
  initialSituations,
  criteriaOrder,
  criteria = {}
) {
  const questions = {};
  const answers = [];

  let questionKey = getNextQuestionKey(
    initialSituations,
    criteriaOrder,
    questions
  );

  while (Object.prototype.hasOwnProperty.call(criteria, questionKey)) {
    questions[questionKey] = criteria[questionKey];
    answers.push([questionKey, getOptions(initialSituations, questionKey)]);

    initialSituations = filterSituations(initialSituations, questions);
    questionKey = getNextQuestionKey(
      initialSituations,
      criteriaOrder,
      questions
    );
  }
  return answers;
}

export function getSituationsFor(data, obj) {
  return data.filter((situation) =>
    Object.entries(obj).every(([key, value]) => situation[key] === value)
  );
}

const isNotEmpty = (obj) => Object.keys(obj).length > 0;

export const isNotYetProcessed = (data, idcc) => {
  const situtation = data.filter(
    (situation) =>
      isNotEmpty(situation.criteria) &&
      parseInt(situation.idcc, 10) === parseInt(idcc, 10)
  );
  return !situtation.length;
};

export function recapSituation(criteria) {
  const cleanValue = (value) => `${value}`.replace(/[0-9]+\|/, "").trim();
  const capitalize = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);

  return (
    <ul>
      {Object.entries(criteria).map(([criteria, value]) => (
        <li key={criteria}>
          {capitalize(criteria)} : <strong>{cleanValue(value)}</strong>
        </li>
      ))}
    </ul>
  );
}

export const getFormProps = ({ key, criteria, pastQuestions }) =>
  // list keys that no longer exist
  Object.keys(criteria)
    .filter((k) => !pastQuestions.find(([key]) => k === key))
    .concat(
      // list keys that need to be reseted
      pastQuestions
        .slice(pastQuestions.findIndex(([k]) => k === key) + 1)
        .map(([key]) => key)
    );
