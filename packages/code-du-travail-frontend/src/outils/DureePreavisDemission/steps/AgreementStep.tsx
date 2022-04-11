import data from "@cdt/data...simulateurs/preavis-demission.data.json";
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
          props.form.change("infos", undefined);
        }}
        mandatory
        note="La convention collective est nécessaire pour obtenir un résultat, le code du travail ne prévoyant rien sur le préavis de démission."
        supportedAgreements={getSupportedCC(data.situations)}
      />
    </>
  );
};
