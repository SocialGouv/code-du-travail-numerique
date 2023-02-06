import { formatIdcc, PublicodesSimulator } from "@socialgouv/modeles-social";
import { Text } from "@socialgouv/cdtn-ui";
import React from "react";

import { Agreement } from "../../../../conventions/Search/api/type";
import { Question } from "../../Question";
import ShowAlert from "../components/ShowAlert";
import { AgreementSupportInfo } from "../types";

type Props = {
  agreement: Agreement;
  supportedAgreements: AgreementSupportInfo[];
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator: PublicodesSimulator;
};

const ShowAgreement = ({
  agreement,
  supportedAgreements,
  alertAgreementNotSupported,
  simulator,
}: Props): JSX.Element => {
  return (
    <>
      <Question required={false} as="p">
        Une convention collective a été trouvée pour cette entreprise&nbsp;:
      </Question>
      <Text fontSize="default" fontWeight="600" variant="secondary">
        {agreement.shortTitle} (IDCC {formatIdcc(agreement.num)})
      </Text>
      <ShowAlert
        currentAgreement={agreement}
        supportedAgreements={supportedAgreements}
        alertAgreementNotSupported={alertAgreementNotSupported}
        simulator={simulator}
      />
    </>
  );
};

export default ShowAgreement;
