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
  margin-top: ${theme.spacings.medium};
  margin-bottom: ${theme.spacings.small};
  font-size: ${theme.fonts.sizes.headings.small};
  cursor: ${props => (props.as ? "default" : "pointer")};
`;

const Mandatory = styled.span`
  display: inline-block;
  margin-left: ${theme.spacings.small};
  color: ${({ theme }) => theme.error};
  font-weight: 700;
`;
