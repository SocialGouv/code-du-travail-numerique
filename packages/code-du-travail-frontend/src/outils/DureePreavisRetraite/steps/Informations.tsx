import React from "react";
import styled from "styled-components";

import { StepDynamicPublicodes } from "../../common/StepDynamicPublicodes";
import { WizardStepProps } from "../../common/type/WizardType";

const excludedRules = [
  "contrat salarié - ancienneté",
  "contrat salarié - convention collective",
  "contrat salarié - mise à la retraite",
];

const Informations = (props: WizardStepProps): JSX.Element => (
  <StyledWidth>
    <StepDynamicPublicodes {...props} excludedRules={excludedRules} />
  </StyledWidth>
);

const StyledWidth = styled.div`
  width: fit-content;
  height: fit-content;
`;

export { Informations };
