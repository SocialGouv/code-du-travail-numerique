import { Alert, Paragraph, Text } from "@socialgouv/cdtn-ui";
import React from "react";

import type { AgreementSupportInfo } from "./types";
import { Agreement } from "../../../conventions/Search/api/type";

type Props = {
  currentIdcc: Agreement;
  supportedAgreements: AgreementSupportInfo[];
  alertCCUnsupported?: (string) => JSX.Element;
};

const ShowAlert = ({
  currentIdcc,
  supportedAgreements,
  alertCCUnsupported,
}: Props): JSX.Element => {
  const idccInfo = supportedAgreements.find(
    (item) => item.idcc == currentIdcc.num
  );
  if (!idccInfo) {
    return (
      <Alert variant="primary">
        <Paragraph
          variant="primary"
          fontSize="hsmall"
          fontWeight="700"
          noMargin
        >
          Convention collective non traitée
        </Paragraph>
        <Paragraph noMargin>
          La convention collective sélectionnée n&apos;est pas traitée par nos
          services.
        </Paragraph>
        {alertCCUnsupported ? (
          alertCCUnsupported(currentIdcc.id)
        ) : (
          <Paragraph noMargin>
            Vous pouvez tout de même poursuivre la simulation qui vous fournira
            un résultat basé sur le code du travail.
          </Paragraph>
        )}
      </Alert>
    );
  }
  if (!idccInfo.fullySupported) {
    return (
      <Alert variant="primary">
        <Text variant="primary" fontSize="hsmall" fontWeight="700">
          Convention prochainement traitée
        </Text>
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
