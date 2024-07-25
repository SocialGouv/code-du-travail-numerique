import React from "react";
import { Alert, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type Props = {
  message: string;
};

export const Note = ({ message }: Props) => (
  <StyledAlert variant="primary">
    <Paragraph noMargin>
      <Text variant="primary" fontSize="hsmall" fontWeight="700">
        À noter
      </Text>
      <br />
      {message}
    </Paragraph>
  </StyledAlert>
);

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
  width: 100%;
`;
