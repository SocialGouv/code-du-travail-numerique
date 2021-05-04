import React from "react";

import { StepDynamicPublicodes } from "../../common/StepDynamicPublicodes";
import { Label } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const Informations = (props: WizardStepProps): JSX.Element => (
  <>
    <Label>
      Veuillez indiquer les informations ci-dessous en rapport à votre
      convention collective.
    </Label>
    <StepDynamicPublicodes {...props} excludedRules={excludedRules} />
  </>
);

export { Informations };
