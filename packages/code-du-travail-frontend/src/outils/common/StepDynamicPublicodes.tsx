import React, { useEffect, useMemo } from "react";

import { MatomoActionEvent, trackQuestion } from "../../lib/matomo";
import { Rule, usePublicodes } from "../publicodes";
import { mapToPublicodesSituation } from "../publicodes/Utils";
import PubliQuestion from "./PubliQuestion";
import { WizardStepProps } from "./type/WizardType";

interface Props extends WizardStepProps {
  excludedRules: Array<string>;
}

type Question = {
  name: string;
  rule: Rule;
  answered: boolean;
};

/**
 * React component to show step by step missing arguments from publicodes.
 * This step allows the user to come back to an answered question.
 * It will reset the depending questions.
 *
 * Note: The collected answers will be stored in the `infos` object in the form.
 * You can use the method `mapToPublicodesSituation` to map to a publicodes situation object from yours steps.
 *
 * @param excludedRules list of rules to exclude from this step. For instance: there are populated by another steps (like CC)
 * @param form the form from react final form provided by the wizard.
 * @constructor
 */
function StepDynamicPublicodes({ excludedRules, form }: Props): JSX.Element {
  const publicodesContext = usePublicodes();
  const formValues = form.getState().values;

  useEffect(() => {
    publicodesContext.setSituation(mapToPublicodesSituation(formValues));
  }, [formValues]);

  const memoizedQuestions: Question[] = useMemo(() => {
    const currentSituation: Question[] = publicodesContext.situation
      .filter((item) => !excludedRules.includes(item.name))
      .map((item) => {
        return {
          answered: true,
          name: item.name,
          rule: item.rawNode,
        };
      });
    const missingArgs: Question[] = publicodesContext.missingArgs
      .filter((item) => !excludedRules.includes(item.name))
      .slice(0, 1)
      .map((item) => {
        return {
          answered: false,
          name: item.name,
          rule: item.rawNode,
        };
      });

    return currentSituation.concat(missingArgs);
  }, [
    publicodesContext.situation,
    publicodesContext.missingArgs,
    excludedRules,
  ]);

  /**
   * Function called when a older question has been asked.
   * We need to reset the form for next questions to remove them from the UI.
   * It's a generic function because the form is based on publicodes
   */
  const resetNextQuestions = (name: string) => {
    const infos = formValues.infos;
    if (!infos) {
      return;
    }
    const infosKeys = Object.keys(infos);
    const indexOfKeyChanged = infosKeys.findIndex((key) => key === name);
    if (indexOfKeyChanged === -1) {
      return;
    }
    form.batch(() => {
      infosKeys
        .slice(indexOfKeyChanged + 1, infosKeys.length)
        .forEach((keyToDelete) => {
          form.change(`infos.${keyToDelete}`, undefined);
        });
    });
  };

  const onTrackDynamicRule = (titleQuestion: string | undefined): void => {
    if (titleQuestion) {
      trackQuestion(titleQuestion, MatomoActionEvent.PREAVIS_RETRAITE, false);
    }
  };

  return (
    <>
      {memoizedQuestions.map((question) => {
        return (
          <PubliQuestion
            key={question.name}
            name={"infos." + question.name}
            rule={question.rule}
            onChange={() => {
              if (question.answered) {
                resetNextQuestions(question.name);
              }
              onTrackDynamicRule(question.rule.titre);
            }}
          />
        );
      })}
    </>
  );
}

export { StepDynamicPublicodes };
