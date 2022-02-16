import { Alert, Paragraph, Text } from "@socialgouv/cdtn-ui";
import React from "react";

import type { AgreementSupportInfo } from "./types";

type Props = {
  currentIdcc: number;
  supportedAgreements: AgreementSupportInfo[];
};

const ShowAlert = ({
  currentIdcc,
  supportedAgreements,
}: Props): JSX.Element => {
  const idccInfo = supportedAgreements.find((item) => item.idcc == currentIdcc);
  if (!idccInfo) {
    return (
      <Alert variant="primary">
        <p>
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            À noter&nbsp;: convention collective non traitée
          </Text>
        </p>
        <Paragraph noMargin>
          La convention collective sélectionnée n&apos;a pas été traitée par nos
          services. Vous pouvez poursuivre la simulation pour connaitre la durée
          prévue par le code du travail mais nous vous conseillons de vérifier
          si votre convention collective prévoit un délai plus favorable qui
          vous serait applicable.
        </Paragraph>
      </Alert>
    );
  }
  if (!idccInfo.fullySupported) {
    return (
      <Alert variant="primary">
        <p>
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            À noter&nbsp;: convention prochainement traitée
          </Text>
        </p>
        <Paragraph noMargin>
          Cette convention collective n&apos;est pas encore traitée par nos
          services mais le sera très prochainement. Vous pouvez poursuivre la
          simulation pour connaitre la durée prévue par le code du travail mais
          nous vous conseillons de vérifier si votre convention collective
          prévoit un délai plus favorable qui vous serait applicable.
        </Paragraph>
      </Alert>
    );
  }

  return <></>;
};

export default ShowAlert;
