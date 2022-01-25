import data from "@cdt/data...simulateurs/preavis-demission.data.json";
import React from "react";

import Html from "../../../common/Html";
import { MatomoActionEvent, trackQuestion } from "../../../lib";
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

const criteriaOrder = questions.map(({ name }) => name);

function StepInformations({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : 0;

  const questionsMap = questions.reduce(
    (state, v) => ({ ...state, [v.name]: v }),
    {}
  );

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
          label={questionsMap[key].question}
          onChange={() => {
            trackQuestion(
              questionsMap[key].name,
              MatomoActionEvent.RESIGNATION,
              false
            );
            form.batch(() => {
              getFormProps({
                criteria,
                key,
                pastQuestions,
              }).forEach((key) => form.change(`criteria.${key}`, undefined));
            });
          }}
          tooltip={
            questionsMap[key].note !== undefined
              ? {
                  content: <Html>{questionsMap[key].note}</Html>,
                  trackableFn: (visibility) => {
                    if (visibility) {
                      trackQuestion(
                        questionsMap[key].name,
                        MatomoActionEvent.RESIGNATION
                      );
                    }
                  },
                }
              : undefined
          }
        />
      ))}
      {nextQuestionKey &&
        nextQuestionOptions &&
        questionsMap[nextQuestionKey] &&
        questionsMap[nextQuestionKey].question && (
          <>
            <SelectQuestion
              name={`criteria.${nextQuestionKey}`}
              label={questionsMap[nextQuestionKey].question}
              options={nextQuestionOptions}
              tooltip={
                questionsMap[nextQuestionKey].note !== undefined
                  ? {
                      content: (
                        <Html>{questionsMap[nextQuestionKey].note}</Html>
                      ),
                      trackableFn: (visibility) => {
                        if (visibility) {
                          trackQuestion(
                            questionsMap[nextQuestionKey].name,
                            MatomoActionEvent.RESIGNATION
                          );
                        }
                      },
                    }
                  : undefined
              }
              onChange={() => {
                trackQuestion(
                  questionsMap[nextQuestionKey].name,
                  MatomoActionEvent.RESIGNATION,
                  false
                );
              }}
            />
          </>
        )}
    </>
  );
}

export { StepInformations };
