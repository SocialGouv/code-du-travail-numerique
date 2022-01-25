import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import React from "react";

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
  (state, { name, question }) => ({ ...state, [name]: question }),
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
  const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);
  const pastQuestions = getPastQuestions(
    initialSituations,
    criteriaOrder,
    criteria
  );

  // Specific sub-label on CC seniority
  const subLabel = (key) =>
    key === "ancienneté"
      ? "Choissisez parmi les catégories d'ancienneté telles que définies par la convention collective"
      : undefined;

  return (
    <>
      <SectionTitle>Statut du salarié</SectionTitle>
      {pastQuestions.map(([key, answers]) => (
        <SelectQuestion
          key={key}
          name={`criteria.${key}`}
          options={answers}
          label={questionsMap[key]}
          subLabel={subLabel(key)}
          onChange={() =>
            form.batch(() => {
              getFormProps({
                criteria,
                key,
                pastQuestions,
              }).forEach((key) => form.change(`criteria.${key}`, undefined));
            })
          }
        />
      ))}
      {nextQuestionKey && nextQuestionOptions && (
        <>
          <SelectQuestion
            name={`criteria.${nextQuestionKey}`}
            label={questionsMap[nextQuestionKey]}
            subLabel={subLabel(nextQuestionKey)}
            options={nextQuestionOptions}
          />
        </>
      )}
    </>
  );
}

export { StepInformations };
