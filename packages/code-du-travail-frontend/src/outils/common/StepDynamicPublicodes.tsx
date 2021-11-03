import React, { useEffect } from "react";

import { usePublicodes } from "../publicodes";
import { mapToPublicodesSituation } from "../publicodes/Utils";
import PubliQuestion from "./PubliQuestion";
import { WizardStepProps } from "./type/WizardType";

interface Props extends WizardStepProps {
  excludedRules: Array<string>;
}

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

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
  }, [form, publicodesContext]);

  /**
   * Function called when a older question has been asked.
   * We need to reset the form for next questions to remove them from the UI.
   * It's a generic function because the form is based on publicodes
   */
  const resetNextQuestions = (name: string) => {
    const infos = form.getState().values.infos;
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

  return (
    <>
      <>
        {publicodesContext.situation
          .filter((item) => !excludedRules.includes(item.name))
          .map((item) => {
            return (
              <PubliQuestion
                key={item.name}
                name={"infos." + item.name}
                rule={item.rawNode}
                onChange={() => resetNextQuestions(item.name)}
              />
            );
          })}
      </>
      <>
        {publicodesContext.missingArgs
          .filter((item) => !excludedRules.includes(item.name))
          .slice(0, 1)
          .map((item) => {
            return (
              <PubliQuestion
                key={item.name}
                name={"infos." + item.name}
                rule={item.rawNode}
              />
            );
          })}
      </>
    </>
  );
}

export { StepDynamicPublicodes };
