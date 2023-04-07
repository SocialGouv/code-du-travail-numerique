import { preavisLicenciementData as data } from "@socialgouv/modeles-social";
import React from "react";

import { SelectAgreement } from "../../common";
import { getSupportedCC } from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";

export const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <SelectAgreement
      title={props.title}
      form={props.form}
      onChange={() => {
        props.form.change("criteria", undefined);
      }}
      supportedAgreements={getSupportedCC(data.situations)}
    />
  );
};
