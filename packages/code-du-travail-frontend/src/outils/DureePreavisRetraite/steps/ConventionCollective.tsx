import { supportedCcn } from "@socialgouv/modeles-social";
import React from "react";

import { StepInfoCCnOptionnal } from "../../common/InfosCCn";
import { WizardStepProps } from "../../common/type/WizardType";

const ConventionCollective = (props: WizardStepProps): JSX.Element => {
  return (
    <StepInfoCCnOptionnal
      {...props}
      supportedCcn={supportedCcn.map((item) => {
        return {
          fullySupported: item.preavisRetraite,
          idcc: item.idcc,
        };
      })}
      isOptional={true}
    />
  );
};

export { ConventionCollective };
