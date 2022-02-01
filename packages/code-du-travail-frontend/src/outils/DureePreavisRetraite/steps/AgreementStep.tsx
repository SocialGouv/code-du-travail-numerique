import { supportedCcn } from "@socialgouv/modeles-social";
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
      supportedAgreements={supportedCcn.map((item) => {
        return {
          fullySupported: item.preavisRetraite,
          idcc: item.idcc,
        };
      })}
    />
  );
};

export { AgreementStep };
