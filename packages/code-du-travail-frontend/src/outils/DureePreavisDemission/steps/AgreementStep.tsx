import { preavisDemissionData as data } from "@socialgouv/modeles-social";
import React from "react";

import { SelectAgreement } from "../../common";
import {
  detectNoAgreementInEnterprise,
  getSupportedCC,
  validateUnsupportedAgreement,
} from "../../common/situations.utils";
import {
  ConventionCollective,
  WizardStepProps,
} from "../../common/type/WizardType";
import NotSupportedAgreementDisclaimer from "./component/NotSupportedAgreementDisclaimer";
import { Simulator } from "../../common/NoticeExample";

const supportedCC = getSupportedCC(data.situations);

const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
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
      simulator={Simulator.PREAVIS_DEMISSION}
    />
  );
};

AgreementStep.validate = ({ ccn }: { ccn?: ConventionCollective }) => {
  return {
    ...validateUnsupportedAgreement(data.situations, ccn),
    ...detectNoAgreementInEnterprise(ccn),
  };
};
export { AgreementStep };
