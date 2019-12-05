import React from "react";
import data from "@cdt/data...preavis-demission/data.json";

import { SelectQuestion } from "../../common/SelectQuestion";
import { SectionTitle } from "../../common/stepStyles";
import {
  getOptions,
  getPastQuestions,
  getNextQuestionKey,
  filterSituations,
  getSituationsFor,
  getFormProps
} from "../../common/situations.utils";

const { questions, situations: allSituations } = data;
const questionsMap = questions.reduce(
  (state, { name, question }) => ({ ...state, [name]: question }),
  {}
);

function StepInformations({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : "0000";

  const initialSituations = getSituationsFor(allSituations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);
  const nextQuestionKey = getNextQuestionKey(possibleSituations, criteria);
  const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);
  const pastQuestions = getPastQuestions(initialSituations, criteria);

  return (
    <>
      <SectionTitle>Informations sur le statut du salarié</SectionTitle>
      {pastQuestions.map(([key, answers]) => (
        <SelectQuestion
          key={key}
          name={`criteria.${key}`}
          options={answers}
          label={questionsMap[key]}
          onChange={() =>
            form.batch(() => {
              getFormProps({
                key,
                criteria,
                pastQuestions
              }).forEach(key => form.change(`criteria.${key}`, undefined));
            })
          }
        />
      ))}
      {nextQuestionKey && nextQuestionOptions && (
        <>
          <SelectQuestion
            name={`criteria.${nextQuestionKey}`}
            label={questionsMap[nextQuestionKey]}
            options={nextQuestionOptions}
          />
        </>
      )}
    </>
  );
}

export { StepInformations };
