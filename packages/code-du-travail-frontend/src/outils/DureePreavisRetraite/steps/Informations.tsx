import React, { useEffect } from "react";

import PubliQuestion from "../../common/PubliQuestion";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";
import { transformInfoCcn } from "../../publicodes/TransformInfoCcn";

function Informations({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  // List of excluded rules to show in this step.
  // Pulicodes can return them as missing args, but there are populated by another steps.
  const excludedRules = [
    "contrat salarié - ancienneté",
    "contrat salarié - convention collective",
    "contrat salarié - mise à la retraite",
  ];
  useEffect(() => {
    publicodesContext.setSituation(transformInfoCcn(form.getState().values));
  }, [form]);

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
              />
            );
          })}
      </>
      <>
        {publicodesContext.missingArgs
          .filter((item) => !excludedRules.includes(item.name))
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

export { Informations };
