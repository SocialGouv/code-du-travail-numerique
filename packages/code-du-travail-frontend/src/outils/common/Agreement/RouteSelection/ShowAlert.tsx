import { Alert, Paragraph, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { AgreementRoute } from "../../type/WizardType";

type ShowAlertProps = {
  route: AgreementRoute;
};

const ShowAlert = ({ route }: ShowAlertProps): JSX.Element => {
  return (
    <>
      {route === "not-selected" && (
        <StyledAlert variant="primary">
          <Paragraph
            variant="primary"
            fontSize="hsmall"
            fontWeight="700"
            noMargin
          >
            Attention
          </Paragraph>
          <Paragraph noMargin>
            Vous pouvez passer cette étape et poursuivre la simulation qui vous
            fournira un résultat basé sur le code du travail. Nous vous
            recommandons de renseigner votre convention collective qui peut
            prévoir un résultat plus favorable que celui défini par le code du
            travail.
          </Paragraph>
        </StyledAlert>
      )}
    </>
  );
};

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
  width: 100%;
`;

export default ShowAlert;
