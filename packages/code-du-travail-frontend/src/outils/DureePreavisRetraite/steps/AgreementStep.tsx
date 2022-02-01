import React from "react";

import { SelectAgreement } from "../../common";
import { WizardStepProps } from "../../common/type/WizardType";

const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <SelectAgreement
      form={props.form}
      onChange={() => {
        // Delete infos when change CC
        props.form.change("infos", undefined);
      }}
    />
  );
};

export { AgreementStep };
