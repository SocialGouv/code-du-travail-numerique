import { primePrecariteData as data } from "@socialgouv/modeles-social";

import {
  filterSituations,
  getPastQuestions,
  getSupportedCC,
} from "../../common/situations.utils";

// humanize questions
export const questions = {
  cddType: "Quel est le type de CDD ?",
  hasCdiProposal:
    "À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?",
  hasCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?",
  hasEquivalentCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?",
};

export const labels = {
  ccn: "convention collective",
  cddType: "type de cdd",
  hasCdiProposal: "proposition d'un cdi",
  hasCdiRenewal: "renouvellement en cdi",
  hasEquivalentCdiRenewal: "renouvellement en cdi équivalent",
};

export const criteriaOrder = [
  "cddType",
  "hasCdiProposal",
  "hasCdiRenewal",
  "hasEquivalentCdiRenewal",
];

export function validateSituation(initialSituations, criteria, errors) {
  const pastQuestions = getPastQuestions(
    initialSituations,
    criteriaOrder,
    criteria
  );
  const situations = filterSituations(initialSituations, criteria);

  if (pastQuestions.length > 0) {
    const [lastQuestionTuple] = pastQuestions.slice(-1);
    const [lastQuestionKey] = lastQuestionTuple;
    if (situations.length >= 1) {
      const [situation] = situations;
      if (!situation.allowBonus && situation.hasConventionalProvision) {
        return {
          ...errors,
          criteria: { [lastQuestionKey]: situation.endMessage },
        };
      } else {
        return { ...errors, criteria: { [lastQuestionKey]: undefined } };
      }
    }
  }
  return { ...errors };
}

export const hasConventionalProvision = (data, idcc) => {
  return data
    .filter((situation) => situation.idcc === idcc)
    .some((situation) => situation.hasConventionalProvision);
};

export const getSupportedCCWithoutConventionalProvision = () => {
  const situations = data.filter(
    (situation) => situation.hasConventionalProvision !== null
  );
  return getSupportedCC(situations);
};
