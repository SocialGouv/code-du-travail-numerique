import { Criteria, Situation } from "@cdt/data";

const createValuesMatcher = (values: Criteria) => (item: Situation) => {
  function swallowEqual(a: Criteria, b: Criteria) {
    return Object.entries(a).every(([key, value]) => {
      return `${b[key]}`.toLowerCase() === `${value}`.toLowerCase();
    });
  }

  return swallowEqual(values, item.criteria);
};

export function filterSituations(
  situations: Situation[],
  criteria: Criteria = {}
): Situation[] {
  const matchValues = createValuesMatcher(criteria);
  return situations.filter(matchValues);
}

export function getNextQuestionKey(
  possibleSituations: Situation[],
  criteriaOrder: string[],
  values = {}
) {
  const [criterion] = criteriaOrder
    .filter((criterion) =>
      possibleSituations.some((situation) => situation.criteria[criterion])
    )
    .filter((criterion) => !values[criterion]);
  return criterion;
}

export function getOptions(
  possibleSituations: Situation[],
  nextQuestionKey: string
): string[][] {
  const dupValues = possibleSituations.map(
    ({ criteria }) => criteria[nextQuestionKey]
  );
  return [...new Set(dupValues)]
    .filter(Boolean)
    .sort(orderCriteria)
    .map(formatOption);
}

export function orderCriteria(a: string, b: string): number {
  const [, numA] = a.match(/([0-9]+)\|/) || [];
  const [, numB] = b.match(/([0-9]+)\|/) || [];
  return numA && numB ? parseInt(numA) - parseInt(numB) : a.localeCompare(b);
}

export function formatOption(a: string): [string, string] {
  return [a, a.replace(/([0-9]+\|)?/, "").trim()];
}

export function getPastQuestions(
  initialSituations: Situation[],
  criteriaOrder: string[],
  criteria = {}
): [string, string[][]][] {
  const questions = {};
  const answers: [string, string[][]][] = [];

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

export function getSituationsFor<T extends Situation>(
  data: T[],
  obj: Record<string, string | number | undefined | null>
): T[] {
  return data.filter((situation) =>
    Object.entries(obj).every(([key, value]) => situation[key] === value)
  );
}

const isNotEmpty = (obj: Criteria) => Object.keys(obj).length > 0;

const situationsForAgreement = (
  data: Situation[],
  idcc: number | undefined | null
) => {
  if (!idcc) return [];

  return data.filter((situation) => situation.idcc === idcc);
};

export const isAgreementSupported = (
  data: Situation[],
  idcc: number | undefined
): boolean => situationsForAgreement(data, idcc).length > 0;

export const hasCriteria = (
  data: Situation[],
  idcc: number | undefined
): boolean =>
  situationsForAgreement(data, idcc).filter((situation) =>
    isNotEmpty(situation.criteria)
  ).length > 0;

export const skipInformations = (
  data: Situation[],
  idcc: number | undefined
): boolean => !isAgreementSupported(data, idcc) || !hasCriteria(data, idcc);

export function recapSituation(criteria: Criteria) {
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

export const getSupportedCC = (
  data: Situation[]
): { fullySupported: boolean; idcc: number }[] => {
  const uniqueIDCC = [
    ...new Map(data.map((item) => [item.idcc, item])).values(),
  ];

  return uniqueIDCC.map((item) => {
    return {
      fullySupported: true,
      idcc: item.idcc,
    };
  });
};

export const validateUnsupportedAgreement =
  (supportedAgreement) =>
  ({ ccn }) => {
    const errors: any = {};
    if (ccn?.selected) {
      const idccInfo = supportedAgreement.find(
        (item) => item.idcc === ccn.selected.num
      );
      if (!idccInfo) {
        errors.agreementMissing = true;
      }
    }

    return errors;
  };
