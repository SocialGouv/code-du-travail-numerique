import React from "react";

import { SelectAgreement } from "../../common";
import { WizardStepProps } from "../../common/type/WizardType";
import { getSupportedCCWithoutConventionalProvision } from "./situation";
import { Simulator } from "../../common/NoticeExample";

export const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <SelectAgreement
      title={props.title}
      form={props.form}
      onChange={() => {
        props.form.change("criteria", undefined);
      }}
      supportedAgreements={getSupportedCCWithoutConventionalProvision()}
      simulator={Simulator.INDEMNITE_PRECARITE}
    />
  );
};
