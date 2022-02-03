import heureRechercheData from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import demissionData from "@cdt/data...simulateurs/preavis-demission.data.json";
import licenciementData from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import React, { useMemo } from "react";

import Html from "../../common/Html";
import { MatomoActionEvent, trackQuestion } from "../../lib";
import { SelectQuestion } from "../common/SelectQuestion";
import {
  filterSituations,
  getFormProps,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  getSituationsFor,
} from "../common/situations.utils";
import { SectionTitle } from "../common/stepStyles";

type OpenArray = Array<{
  key: string;
  status: boolean;
}>;

type Props = {
  form: any;
  actionEvent?: MatomoActionEvent;
};

export function StepInformations({ form, actionEvent }: Props): JSX.Element {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : 0;

  const subLabel = (key) =>
    key === "ancienneté"
      ? "Choisissez parmi les catégories d'ancienneté telles que définies par la convention collective"
      : undefined;

  const questions = useMemo(() => {
    switch (actionEvent) {
      case MatomoActionEvent.HEURE_RECHERCHE_EMPLOI:
        return heureRechercheData.questions;
      case MatomoActionEvent.PREAVIS_DEMISSION:
        return demissionData.questions;
      case MatomoActionEvent.PREAVIS_LICENCIEMENT:
        return licenciementData.questions;
      default:
        return [];
    }
  }, [actionEvent]);

  const allSituations = useMemo(() => {
    switch (actionEvent) {
      case MatomoActionEvent.HEURE_RECHERCHE_EMPLOI:
        return heureRechercheData.situations;
      case MatomoActionEvent.PREAVIS_DEMISSION:
        return demissionData.situations;
      case MatomoActionEvent.PREAVIS_LICENCIEMENT:
        return licenciementData.situations;
      default:
        return [];
    }
  }, [actionEvent]);

  const questionsMap = useMemo(() => {
    return questions.reduce((state, v) => ({ ...state, [v.name]: v }), {});
  }, [questions]);

  const criteriaOrder = useMemo(() => {
    return questions.map(({ name }) => name);
  }, [questions]);

  const memoizedQuestions: any = useMemo(() => {
    const initialSituations = getSituationsFor(allSituations, { idcc });
    const pastQuestions = getPastQuestions(
      initialSituations,
      criteriaOrder,
      criteria
    );
    const possibleSituations = filterSituations(initialSituations, criteria);
    const nextQuestionKey = getNextQuestionKey(
      possibleSituations,
      criteriaOrder,
      criteria
    );
    const nextQuestionOptions = getOptions(possibleSituations, nextQuestionKey);
    return [...pastQuestions, [nextQuestionKey, nextQuestionOptions]];
  }, [criteria, idcc, allSituations, criteriaOrder]);

  const [isOpenArray, setIsOpenArray] = React.useState<OpenArray>([]);

  const handleChange = (key: string) => {
    let isFound = false;
    const arr = isOpenArray.map((v) => {
      if (v.key === key) {
        isFound = true;
        return { ...v, status: !v.status };
      }
      return v;
    });
    if (!isFound) {
      setIsOpenArray([...isOpenArray, { key, status: true }]);
    } else {
      setIsOpenArray(arr);
    }
  };

  return (
    <>
      <SectionTitle>Statut du salarié</SectionTitle>
      {memoizedQuestions.map(([key, answers], index) => (
        <div key={index + key}>
          {questionsMap[key] && (
            <SelectQuestion
              name={`criteria.${key}`}
              options={answers}
              label={questionsMap[key].question}
              subLabel={subLabel(key)}
              onChange={() => {
                trackQuestion(questionsMap[key].name, actionEvent, false);
                form.batch(() => {
                  getFormProps({
                    criteria,
                    key,
                    pastQuestions: memoizedQuestions,
                  }).forEach((key) =>
                    form.change(`criteria.${key}`, undefined)
                  );
                });
              }}
              isTooltipOpen={
                isOpenArray.find((v) => v.key === key)?.status ?? false
              }
              onSwitchTooltip={() => handleChange(key)}
              tooltip={
                questionsMap[key].note !== undefined
                  ? {
                      content: <Html>{questionsMap[key].note}</Html>,
                      trackableFn: (visibility) => {
                        if (visibility) {
                          trackQuestion(questionsMap[key].name, actionEvent);
                        }
                      },
                    }
                  : undefined
              }
            />
          )}
        </div>
      ))}
    </>
  );
}
