import React from "react";

import styled from "styled-components";
import { Button, icons, theme } from "@socialgouv/react-ui";

export function AddButton({ children, ...props }) {
  return (
    <StyledAddButton variant="naked" narrow small type="button" {...props}>
      <MoreIcon aria-hidden="true" />
      {children}
    </StyledAddButton>
  );
}

export function DelButton({ children, ...props }) {
  return (
    <StyledDelButton narrow variant="naked" type="button" {...props}>
      {children}
      <CloseIcon aria-hidden="true" />
    </StyledDelButton>
  );
}
const { spacings } = theme;

const StyledAddButton = styled(Button)`
  align-self: flex-start;
  margin: ${spacings.small} 0;
  padding-left: 0;
`;

const StyledDelButton = styled(Button)`
  margin-left: ${spacings.small};
`;

const CloseIcon = styled(icons.Close)`
  width: 2rem;
  margin-left: ${spacings.tiny};
  color: ${({ theme }) => theme.primary};
`;

const MoreIcon = styled(icons.More)`
  width: 2rem;
  margin-right: ${spacings.tiny};
  color: ${({ theme }) => theme.primary};
`;
