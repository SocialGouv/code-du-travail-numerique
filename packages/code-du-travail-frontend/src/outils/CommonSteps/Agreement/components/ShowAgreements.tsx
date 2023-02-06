import { formatIdcc, PublicodesSimulator } from "@socialgouv/modeles-social";
import React from "react";

import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../conventions/Search/api/type";
import { RadioQuestion } from "../../../Components";
import { AgreementSupportInfo } from "../../../common/Agreement/types";
import ShowAlert from "../../../common/Agreement/components/ShowAlert";

type Props = {
  enterprise: Enterprise;
  agreement?: Agreement;
  onChange: (enterprise: Enterprise, agreement: Agreement | null) => void;
  supportedAgreements: AgreementSupportInfo[];
  error?: string;
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator: PublicodesSimulator;
};

const ShowAgreements = ({
  enterprise,
  agreement,
  onChange,
  supportedAgreements,
  error,
  alertAgreementNotSupported,
  simulator,
}: Props): JSX.Element => {
  const onAgreementChange = (idcc: string) => {
    const agreement = enterprise.conventions.find(
      (agreement) => agreement.num === Number(idcc)
    );
    onChange(enterprise, agreement ?? null);
  };
  return (
    <>
      <RadioQuestion
        questions={enterprise.conventions.map((agreement) => ({
          label: `${agreement.shortTitle} (IDCC ${formatIdcc(agreement.num)})`,
          value: `${agreement.num}`,
          id: `enterprise-agreement-${agreement.num}`,
        }))}
        name="agreement"
        label={`${enterprise.conventions.length} conventions collectives ont été trouvées pour cette entreprise, sélectionnez la vôtre :`}
        selectedOption={agreement?.num.toString()}
        onChangeSelectedOption={onAgreementChange}
        error={error}
        showRequired
      />
      {agreement && (
        <ShowAlert
          currentAgreement={agreement}
          supportedAgreements={supportedAgreements}
          alertAgreementNotSupported={alertAgreementNotSupported}
          simulator={simulator}
        />
      )}
    </>
  );
};

export default ShowAgreements;
