import React from "react";
import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

export const WarningOriginDepart = (): JSX.Element => {
  return (
    <StyledAlert variant="primary" data-testid="warning-origin-depart">
      <Paragraph noMargin>
        <Text variant="primary" fontSize="hsmall" fontWeight="700">
          À noter
        </Text>
        <br />
        L&apos;employeur qui décide une mise à la retraite doit en avoir informé
        son salarié.
        <br />
        Plus d&apos;info&nbsp;:{" "}
        <a
          href="/fiche-service-public/un-employeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
          target="_blank"
        >
          L&apos;employeur peut-il mettre d&apos;office un salarié à la retraite
          ?
        </a>
      </Paragraph>
    </StyledAlert>
  );
};

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
  width: 100%;
`;
