import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";
import React from "react";

import { SelectAgreement } from "../../common";
import { getSupportedCC } from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";

export const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <>
      <SelectAgreement
        title={props.title}
        form={props.form}
        onChange={() => {
          // Delete infos when change CC
          props.form.reset();
          props.form.change("ccn.route", "agreement");
          props.form.change("ccn.selected", null);
        }}
        supportedAgreements={getSupportedCC(data.situations)}
      />
    </>
  );
};
