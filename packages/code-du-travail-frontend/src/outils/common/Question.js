import React from "react";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";

export function Question({ required, children, ...otherProps }) {
  return (
    <Label {...otherProps}>
      {children}
      {required && <Mandatory aria-label="champs obligatoire">*</Mandatory>}
    </Label>
  );
}

const Label = styled.label`
  display: block;
  margin-top: ${theme.spacing.interComponent};
  margin-bottom: ${theme.spacing.small};
  font-size: 1.25rem;
  cursor: ${props => (props.as ? "default" : "pointer")};
`;

const Mandatory = styled.span`
  display: inline-block;
  margin-left: ${theme.spacing.small};
  color: ${({ theme }) => theme.errorText};
  font-weight: 700;
`;
