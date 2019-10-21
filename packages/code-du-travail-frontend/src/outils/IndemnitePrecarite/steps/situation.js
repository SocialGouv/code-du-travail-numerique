import data from "@cdt/data...prime-precarite/precarite.data.json";

// humanize questions
export const questions = {
  cddType: "Quelle est le type de votre cdd ?",
  hasCdiProposal: "À la fin de votre CDD, vous a-t-on proposé un CDI ?",
  hasCdiRenewal:
    "À la fin de votre CDD, avez-vous été immédiatement embauché en CDI ?",
  hasEquivalentCdiRenewal:
    "À la fin de votre CDD, avez-vous été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?"
};

export const labels = {
  ccn: "convention collective",
  cddType: "type de cdd",
  hasCdiProposal: "proposition d'un cdi",
  hasCdiRenewal: "renouvellement en cdi",
  hasEquivalentCdiRenewal: "renouvellement en cdi équivalent"
};

export const hasConventionalProvision = idcc => {
  return data
    .filter(situation => situation.idcc === idcc)
    .some(situation => situation.hasConventionalProvision);
};

export const isNotYetProcessed = idcc => {
  const situations = data.filter(situation => situation.idcc === idcc);
  return (
    situations.length === 0 ||
    situations.some(situation => situation.hasConventionalProvision === null)
  );
};

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

export function getSituationsFor(obj) {
  return data.filter(situation =>
    Object.entries(obj).every(([key, value]) => situation[key] === value)
  );
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

export function validateSituation(initialSituations, criteria, errors) {
  const pastQuestions = getPastQuestions(initialSituations, criteria);
  const situations = filterSituations(initialSituations, criteria);

  if (pastQuestions.length > 0) {
    const [lastQuestionTuple] = pastQuestions.slice(-1);
    const [lastQuestionKey] = lastQuestionTuple;
    if (situations.length >= 1) {
      const [situation] = situations;
      if (!situation.allowBonus) {
        return {
          ...errors,
          criteria: { [lastQuestionKey]: situation.endMessage }
        };
      } else {
        return { ...errors, criteria: { [lastQuestionKey]: undefined } };
      }
    }
  }
  return { ...errors };
}
