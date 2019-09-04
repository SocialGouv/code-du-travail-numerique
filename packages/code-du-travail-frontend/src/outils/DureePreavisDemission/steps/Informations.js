import React from "react";
import { Alert } from "@cdt/ui-old";
import { SelectQuestion } from "../../common/SelectQuestion";
import { SectionTitle } from "../../common/stepStyles";

import {
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  questions,
  labels
} from "./situation";

function StepInformations({ form }) {
  const { values } = form.getState();
  const possibleSituations = filterSituations(values);
  const nextQuestionKey = getNextQuestionKey(possibleSituations, values);
  const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);
  const pastQuestions = getPastQuestions(values);
  const showHelp = ["groupe", "coefficient", "echelon"].includes(
    nextQuestionKey
  );

  return (
    <>
      <SectionTitle>Informations sur le statut du salarié</SectionTitle>
      {pastQuestions.map(([key, answers]) => (
        <SelectQuestion
          key={key}
          name={key}
          options={answers}
          label={questions[key]}
          onChange={() => {
            form.batch(() => {
              // list keys that no longer exist
              const resetFormProps = Object.keys(values)
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
        <SelectQuestion
          name={nextQuestionKey}
          label={questions[nextQuestionKey]}
          options={nextQuestionOptions}
        />
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
