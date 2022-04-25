import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";
import React from "react";

import { SelectAgreement } from "../../common";
import { getSupportedCC } from "../../common/situations.utils";
import { WizardStepProps } from "../../common/type/WizardType";
import UnsupportedCCDisclaimer from "./component/UnsupportedCCDisclaimer";

const supportedCC = getSupportedCC(data.situations);

type Validate = {
  agreementMissing?: boolean;
};

function validate({ ccn }): Validate {
  const errors: Validate = {};

  if (ccn?.selected) {
    const idccInfo = supportedCC.find((item) => item.idcc == ccn.selected.num);
    if (!idccInfo) {
      errors.agreementMissing = true;
    }
  }

  return errors;
}

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
          <UnsupportedCCDisclaimer agreementUrl={url} />
        )}
      />
    </>
  );
};

AgreementStep.validate = validate;

export { AgreementStep };
