import React from "react";

import { StepInfoCCnOptionnal } from "../../common/InfosCCn";
import { WizardStepProps } from "../../common/type/WizardType";

const ConventionCollective = (props: WizardStepProps): JSX.Element => (
  <StepInfoCCnOptionnal {...props} />
);

export { ConventionCollective };
