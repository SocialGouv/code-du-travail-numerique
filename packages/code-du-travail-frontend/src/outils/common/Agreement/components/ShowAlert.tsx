import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";

import { AgreementSupportInfo } from "../types";
import { Agreement } from "../../../../conventions/Search/api/type";
import styled from "styled-components";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

type Props = {
  currentAgreement: Agreement;
  supportedAgreements: AgreementSupportInfo[];
  alertAgreementNotSupported?: (string) => JSX.Element;
  simulator?: PublicodesSimulator;
};

const ShowAlert = ({
  currentAgreement,
  supportedAgreements,
  alertAgreementNotSupported,
  simulator = PublicodesSimulator.PREAVIS_RETRAITE,
}: Props): JSX.Element => {
  const idccInfo = supportedAgreements.find(
    (item) => item.idcc == currentAgreement.num
  );
  if (!idccInfo) {
    return (
      <>
        <StyledAlert variant="primary">
          <Paragraph
            variant="primary"
            fontSize="hsmall"
            fontWeight="700"
            noMargin
          >
            Convention collective non traitée
          </Paragraph>
          {alertAgreementNotSupported ? (
            alertAgreementNotSupported(currentAgreement.url)
          ) : (
            <>
              <Paragraph>
                La convention collective sélectionnée n&apos;est pas traitée par
                nos services.
              </Paragraph>
              <Paragraph>
                Vous pouvez tout de même poursuivre la simulation qui vous
                fournira un résultat basé sur le code du travail.
              </Paragraph>
            </>
          )}
        </StyledAlert>
        {!alertAgreementNotSupported && (
          <StyledParagraph>
            Cliquez sur Suivant pour poursuivre la simulation.
          </StyledParagraph>
        )}
      </>
    );
  }
  if (!idccInfo.fullySupported) {
    return (
      <>
        <StyledAlert variant="primary">
          <Text variant="primary" fontSize="hsmall" fontWeight="700">
            Convention prochainement traitée
          </Text>
          <Paragraph>
            {simulator === PublicodesSimulator.PREAVIS_RETRAITE ? (
              <>
                Cette convention collective n&apos;est pas encore traitée par
                nos services mais le sera très prochainement. Vous pouvez
                poursuivre la simulation pour connaître la durée prévue par le
                code du travail mais nous vous conseillons de vérifier si votre
                convention collective prévoit un délai plus favorable qui vous
                serait applicable.
              </>
            ) : (
              <>
                Cette convention collective n&apos;est pas encore traitée par
                nos services mais le sera très prochainement. Vous pouvez
                poursuivre la simulation pour connaître le montant prévu par le
                code du travail mais nous vous conseillons de vérifier si votre
                convention collective prévoit un montant plus favorable pour le
                salarié.
              </>
            )}
          </Paragraph>
        </StyledAlert>
        <StyledParagraph>
          Cliquez sur Suivant pour poursuivre la simulation.
        </StyledParagraph>
      </>
    );
  }

  return (
    <StyledParagraph>
      Cliquez sur Suivant pour poursuivre la simulation.
    </StyledParagraph>
  );
};

export default ShowAlert;

const StyledAlert = styled(Alert)`
  margin-top: ${theme.spacings.small};
`;
const StyledParagraph = styled(Paragraph)`
  margin-top: ${theme.spacings.large};
`;
