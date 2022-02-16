import data from "@cdt/data...simulateurs/preavis-demission.data.json";
import React from "react";

import { SelectAgreement } from "../../common";
import { getSupportedCC } from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";

export const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <>
      <SelectAgreement
        form={props.form}
        onChange={() => {
          // Delete infos when change CC
          props.form.change("infos", undefined);
        }}
        supportedAgreements={getSupportedCC(data.situations)}
      />
    </>
  );
};
