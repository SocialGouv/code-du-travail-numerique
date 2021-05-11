import { Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export function Question({ required, children, ...otherProps }) {
  return (
    <Label {...otherProps}>
      {children}
      {required && <Text fontWeight="400">&nbsp;(obligatoire)</Text>}
    </Label>
  );
}

const { breakpoints, fonts, spacings } = theme;

const Label = styled.label`
  display: block;
  margin-top: ${spacings.medium};
  margin-bottom: ${spacings.small};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
