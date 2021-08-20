import { icons, Text, theme, Tooltip } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

type Props = {
  as?: string;
  required: boolean;
  tooltip?: string;
  children: React.ReactNode;
};

export const Question = ({
  required,
  tooltip,
  children,
  ...otherProps
}: Props): JSX.Element => (
  <Label {...otherProps}>
    {children}
    {required && <Text fontWeight="400">&nbsp;(obligatoire)</Text>}
    {tooltip && (
      <Tooltip text={tooltip} position="right">
        <icons.Help width="2rem" />
      </Tooltip>
    )}
  </Label>
);

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
