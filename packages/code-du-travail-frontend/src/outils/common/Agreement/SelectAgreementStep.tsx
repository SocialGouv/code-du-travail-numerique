import React from "react";

import { WizardStepProps } from "../type/WizardType";
import { SelectAgreement } from "./index";

const SelectAgreementStep = (props: WizardStepProps): JSX.Element => (
  <SelectAgreement
    form={props.form}
    onChange={() => {
      // Delete infos when change CC
      props.form.change("infos", undefined);
    }}
  />
);
export { SelectAgreementStep };
