import data from "@cdt/data...prime-precarite/precarite.data.json";
import {
  getPastQuestions,
  filterSituations
} from "../../common/situations.utils";

// humanize questions
export const questions = {
  cddType: "Quelle est le type du cdd ?",
  hasCdiProposal:
    "À la fin du CDD, le salarié a-t-il reçu une proposition de CDI ?",
  hasCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI ?",
  hasEquivalentCdiRenewal:
    "À la fin du CDD, le salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?"
};

export const labels = {
  ccn: "convention collective",
  cddType: "type de cdd",
  hasCdiProposal: "proposition d'un cdi",
  hasCdiRenewal: "renouvellement en cdi",
  hasEquivalentCdiRenewal: "renouvellement en cdi équivalent"
};

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

export const hasConventionalProvision = (data, idcc) => {
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
