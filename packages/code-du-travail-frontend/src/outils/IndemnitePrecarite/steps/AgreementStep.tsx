import React from "react";

import { SelectAgreement } from "../../common";
import { WizardStepProps } from "../../common/type/WizardType";
import { getSupportedCCWithoutConventionalProvision } from "./situation";

export const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <SelectAgreement
      title={props.title}
      form={props.form}
      onChange={() => {
        // Delete infos when change CC
        props.form.change("criteria", undefined);
      }}
      supportedAgreements={getSupportedCCWithoutConventionalProvision()}
    />
  );
};
