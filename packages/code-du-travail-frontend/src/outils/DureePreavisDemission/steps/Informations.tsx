import data from "@cdt/data...simulateurs/preavis-demission.data.json";
import React from "react";

import Html from "../../../common/Html";
import { trackQuestion } from "../../../lib";
import { SelectQuestion } from "../../common/SelectQuestion";
import {
  filterSituations,
  getFormProps,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  getSituationsFor,
} from "../../common/situations.utils";
import { SectionTitle } from "../../common/stepStyles";

const { questions, situations: allSituations } = data;
const questionsMap = questions.reduce(
  (state, v) => ({ ...state, [v.name]: v }),
  {}
);

const criteriaOrder = questions.map(({ name }) => name);

function StepInformations({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : 0;

  const initialSituations = getSituationsFor(allSituations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);
  const nextQuestionKey = getNextQuestionKey(
    possibleSituations,
    criteriaOrder,
    criteria
  );
  const nextQuestionOptions: any = getOptions(
    possibleSituations,
    nextQuestionKey
  );
  const pastQuestions = getPastQuestions(
    initialSituations,
    criteriaOrder,
    criteria
  );

  return (
    <>
      <SectionTitle>Statut du salarié</SectionTitle>
      {pastQuestions.map(([key, answers]) => (
        <SelectQuestion
          key={key}
          name={`criteria.${key}`}
          options={answers}
          label={questionsMap[key].name}
          onChange={() =>
            form.batch(() => {
              getFormProps({
                criteria,
                key,
                pastQuestions,
              }).forEach((key) => form.change(`criteria.${key}`, undefined));
            })
          }
          tooltip={{
            content: <Html>{questionsMap[nextQuestionKey].note}</Html>,
            trackableFn: (visibility) => {
              if (visibility) {
                trackQuestion(questionsMap[nextQuestionKey].note);
              }
            },
          }}
        />
      ))}
      {nextQuestionKey && nextQuestionOptions && (
        <>
          <SelectQuestion
            name={`criteria.${nextQuestionKey}`}
            label={questionsMap[nextQuestionKey].name}
            options={nextQuestionOptions}
          />
        </>
      )}
    </>
  );
}

export { StepInformations };
