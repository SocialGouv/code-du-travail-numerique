import React from "react";

import { StepDynamicPublicodes } from "../../common/StepDynamicPublicodes";
import { PreavisRetraiteFormContent } from "../../common/type/WizardType";
import { FormApi } from "final-form";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

type Props = {
  form: FormApi<PreavisRetraiteFormContent>;
};

const Informations = (props: Props): JSX.Element => (
  <>
    <StepDynamicPublicodes {...props} excludedRules={excludedRules} />
  </>
);

export { Informations };
