import { supportedCcn } from "@socialgouv/modeles-social/lib/constants";
import React from "react";

import { StepInfoCCnOptionnal } from "../../common/InfosCCn";
import { WizardStepProps } from "../../common/type/WizardType";

const ConventionCollective = (props: WizardStepProps): JSX.Element => {
  return (
    <StepInfoCCnOptionnal
      {...props}
      supportedCcn={supportedCcn}
      isOptional={true}
    />
  );
};

export { ConventionCollective };
