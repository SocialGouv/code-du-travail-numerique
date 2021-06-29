import React from "react";

import { StepDynamicPublicodes } from "../../common/StepDynamicPublicodes";
import { WizardStepProps } from "../../common/type/WizardType";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const Informations = (props: WizardStepProps): JSX.Element => (
  <>
    <StepDynamicPublicodes {...props} excludedRules={excludedRules} />
  </>
);

export { Informations };
