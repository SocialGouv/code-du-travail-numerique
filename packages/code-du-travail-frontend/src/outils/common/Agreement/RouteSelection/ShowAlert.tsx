import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
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
          <Paragraph noMargin>
            <Text variant="primary" fontSize="hsmall" fontWeight="700">
              À noter
            </Text>
          </Paragraph>
          <Paragraph>
            Vous pouvez passer cette étape et poursuivre la simulation pour
            connaitre la durée prévue par le code du travail mais nous vous
            conseillons d&apos;indiquer votre convention collective afin de voir
            si elle prévoit un délai plus favorable qui vous serait applicable.
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
