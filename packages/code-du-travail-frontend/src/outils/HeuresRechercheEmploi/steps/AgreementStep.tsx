import { heuresRechercheEmploiData as data } from "@socialgouv/modeles-social";
import React from "react";

import { SelectAgreement } from "../../common";
import {
  getSupportedCC,
  validateUnsupportedAgreement,
} from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";
import NotSupportedAgreementDisclaimer from "./component/NotSupportedAgreementDisclaimer";
import { Simulator } from "../../common/NoticeExample";

const supportedCC = getSupportedCC(data.situations);

const AgreementStep = (props: WizardStepProps): JSX.Element => {
  return (
    <>
      <SelectAgreement
        title={props.title}
        form={props.form}
        onChange={() => {
          props.form.change("criteria", undefined);
          props.form.change("typeRupture", undefined);
        }}
        required
        note="La convention collective est nécessaire pour obtenir un résultat, le code du travail ne prévoyant rien sur les heures d'absence autorisée pour rechercher un emploi pendant le préavis."
        supportedAgreements={supportedCC}
        alertAgreementNotSupported={(url: string) => (
          <NotSupportedAgreementDisclaimer agreementUrl={url} />
        )}
        simulator={Simulator.HEURES_RECHERCHE_EMPLOI}
      />
    </>
  );
};

AgreementStep.validate = validateUnsupportedAgreement(
  getSupportedCC(data.situations)
);

export { AgreementStep };
