import React from "react";

import { StepDynamicPublicodes } from "../../common/StepDynamicPublicodes";
import { SectionTitle } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const Informations = (props: WizardStepProps): JSX.Element => (
  <>
    <SectionTitle>
      Veuillez indiquer les informations ci-dessous en rapport à votre
      convention collective.
    </SectionTitle>
    <StepDynamicPublicodes {...props} excludedRules={excludedRules} />
  </>
);

export { Informations };
