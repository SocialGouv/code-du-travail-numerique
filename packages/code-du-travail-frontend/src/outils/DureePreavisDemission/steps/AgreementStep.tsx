import { preavisDemissionData as data } from "@cdt/data";
import React from "react";

import { SelectAgreement } from "../../common";
import {
  getSupportedCC,
  validateUnsupportedAgreement,
} from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";
import NotSupportedAgreementDisclaimer from "./component/NotSupportedAgreementDisclaimer";

const supportedCC = getSupportedCC(data.situations);

const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <>
      <SelectAgreement
        title={props.title}
        form={props.form}
        onChange={() => {
          props.form.change("criteria", undefined);
        }}
        required
        note="La convention collective est nécessaire pour obtenir un résultat, le code du travail ne prévoyant rien sur le préavis de démission."
        supportedAgreements={supportedCC}
        alertAgreementNotSupported={(url: string) => (
          <NotSupportedAgreementDisclaimer agreementUrl={url} />
        )}
      />
    </>
  );
};

AgreementStep.validate = validateUnsupportedAgreement(
  getSupportedCC(data.situations)
);
export { AgreementStep };
