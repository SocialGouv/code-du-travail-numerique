import {
  heuresRechercheEmploiData,
  preavisDemissionData,
  preavisLicenciementData,
} from "@cdt/data";
import { FormApi } from "final-form";
import React, { useMemo } from "react";

import Html from "../../common/Html";
import { MatomoActionEvent, trackQuestion } from "../../lib";
import { SelectQuestion } from "./SelectQuestion";
import {
  filterSituations,
  getFormProps,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  getSituationsFor,
} from "./situations.utils";
import { SectionTitle } from "./stepStyles";
import { FormContent } from "./type/WizardType";

type OpenArray = Array<{
  key: string;
  status: boolean;
}>;

export type StepInformationsProps = {
  form: FormApi<FormContent>;
  actionEvent?: MatomoActionEvent;
};

export function StepInformations({
  form,
  actionEvent,
}: StepInformationsProps): JSX.Element {
  const { values } = form.getState();
  const { ccn, typeRupture = null, criteria = {} } = values;
  const idcc = ccn?.selected?.num ?? 0;

  const subLabel = (key) =>
    key === "ancienneté"
      ? "Choisissez parmi les catégories d'ancienneté telles que définies par la convention collective"
      : undefined;

  const questions = useMemo(() => {
    switch (actionEvent) {
      case MatomoActionEvent.HEURE_RECHERCHE_EMPLOI:
        return heuresRechercheEmploiData.questions;
      case MatomoActionEvent.PREAVIS_DEMISSION:
        return preavisDemissionData.questions;
      case MatomoActionEvent.PREAVIS_LICENCIEMENT:
        return preavisLicenciementData.questions;
      default:
        return [];
    }
  }, [actionEvent]);

  const allSituations = useMemo(() => {
    switch (actionEvent) {
      case MatomoActionEvent.HEURE_RECHERCHE_EMPLOI:
        return heuresRechercheEmploiData.situations;
      case MatomoActionEvent.PREAVIS_DEMISSION:
        return preavisDemissionData.situations;
      case MatomoActionEvent.PREAVIS_LICENCIEMENT:
        return preavisLicenciementData.situations;
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
    const initialSituations = getSituationsFor(allSituations, {
      idcc,
      typeRupture,
    });
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
      {memoizedQuestions
        .filter(([key]) => !!key)
        .map(([key, answers], index) => (
          <div key={`${index}-${key}-${criteria[key] ? "set" : "unset"}`}>
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
                    }).forEach((key) => {
                      if (key) {
                        form.change(`criteria.${key}`, undefined);
                      }
                    });
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
