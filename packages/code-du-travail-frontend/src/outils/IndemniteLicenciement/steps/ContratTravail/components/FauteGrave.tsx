import { Alert, Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

const FauteGrave = (): JSX.Element => {
  return (
    <Alert variant="primary" role="alert">
      <AlertTitle>À noter</AlertTitle>
      <Paragraph noMargin>
        <strong>
          L’indemnité légale de licenciement n’est pas dûe en cas de faute
          grave.
        </strong>
        <br />
        Lorsqu’il est invoqué, le motif de faute grave doit apparaître
        précisément dans le courrier. Reportez vous à la lettre de notification
        de licenciement.
      </Paragraph>
    </Alert>
  );
};

export const AlertTitle = styled.p.attrs({
  "aria-level": "2",
  role: "heading",
})`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

export default FauteGrave;
