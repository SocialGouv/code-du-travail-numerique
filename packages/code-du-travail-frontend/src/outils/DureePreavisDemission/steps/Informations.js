import React from "react";
import { Alert } from "@socialgouv/react-ui";
import data from "@cdt/data...preavis-demission/data.json";

import { SelectQuestion } from "../../common/SelectQuestion";
import { SectionTitle } from "../../common/stepStyles";
import {
  isNotYetProcessed,
  getOptions,
  getPastQuestions,
  getNextQuestionKey,
  filterSituations,
  getSituationsFor
} from "../../common/situations.utils";

import { questions, labels } from "./situation.js";

function StepInformations({ form, nextStep }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : "0000";

  // Go to results when cc is not processed
  if (isNotYetProcessed(data, idcc)) {
    nextStep();
    return null;
  }

  const initialSituations = getSituationsFor(data, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);
  const nextQuestionKey = getNextQuestionKey(possibleSituations, criteria);
  const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);
  const pastQuestions = getPastQuestions(initialSituations, criteria);

  const showHelp = ["groupe", "coefficient", "echelon"].includes(
    nextQuestionKey
  );

  return (
    <>
      <SectionTitle>Informations sur le statut du salarié</SectionTitle>
      {pastQuestions.map(([key, answers]) => (
        <SelectQuestion
          key={key}
          name={`criteria.${key}`}
          options={answers}
          label={questions[key]}
          onChange={() => {
            form.batch(() => {
              // list keys that no longer exist
              const resetFormProps = Object.keys(initialSituations)
                .filter(k => !pastQuestions.find(([key]) => k === key))
                .concat(
                  // list keys that need to be reseted
                  pastQuestions
                    .slice(pastQuestions.findIndex(([k]) => k === key) + 1)
                    .map(([key]) => key)
                );
              resetFormProps.forEach(key => form.change(key, undefined));
            });
          }}
        />
      ))}
      {nextQuestionKey && nextQuestionOptions && (
        <>
          <SelectQuestion
            name={`criteria.${nextQuestionKey}`}
            label={questions[nextQuestionKey]}
            options={nextQuestionOptions}
          />
        </>
      )}
      {showHelp && (
        <Alert>
          Si vous ne connaissez pas le {labels[nextQuestionKey]}, munissez-vous
          du dernier bulletin de salaire, où ce dernier doit obligatoirement
          figurer. Cette information se trouve souvent dans l’en-tête.
        </Alert>
      )}
    </>
  );
}

export { StepInformations };
