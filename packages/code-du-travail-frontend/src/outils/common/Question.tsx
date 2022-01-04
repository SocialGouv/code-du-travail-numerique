import { Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InfoBulle } from "./InfoBulle";

export type Tooltip = {
  content: JSX.Element;
  help?: string;
  trackableFn?: (actualVisibility: boolean) => void;
};
type Props = {
  as?: string;
  required: boolean;
  tooltip?: Tooltip;
  children: React.ReactNode;
  htmlFor?: string;
};

export const Question = ({
  required,
  tooltip,
  children,
  htmlFor,
  ...otherProps
}: Props): JSX.Element => (
  <LabelBlock htmlFor={htmlFor} {...otherProps}>
    {children}
    {required && <Text fontWeight="400">&nbsp;(obligatoire)</Text>}
    {tooltip && (
      <InfoBulle
        title={tooltip.help ?? "Plus d'informations"}
        onVisibilityChange={tooltip.trackableFn}
      >
        {tooltip.content}
      </InfoBulle>
    )}
  </LabelBlock>
);

const { breakpoints, fonts, spacings } = theme;

const LabelBlock = styled.label`
  display: inline-block;
  margin-top: ${spacings.medium};
  margin-bottom: ${spacings.small};
  font-size: ${fonts.sizes.headings.small};
  font-weight: 600;
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
