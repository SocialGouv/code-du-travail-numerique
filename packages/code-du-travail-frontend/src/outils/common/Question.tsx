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
  required?: boolean;
  tooltip?: Tooltip;
  children: React.ReactNode;
  htmlFor?: string;
  isTooltipOpen?: boolean;
  onSwitchTooltip?: () => void;
};

export const Question = ({
  required,
  tooltip,
  children,
  htmlFor,
  isTooltipOpen,
  onSwitchTooltip,
  ...otherProps
}: Props): JSX.Element => {
  const [isLocalTooltipOpen, setIsLocalToolTipOpen] = React.useState(false);
  return (
    <LabelBlock
      htmlFor={htmlFor}
      {...otherProps}
      data-testid={"question-label"}
    >
      <Text
        fontWeight="600"
        fontSize={otherProps.as === "p" ? "default" : "hsmall"}
      >
        {children}
        {required && <Text as="span">&nbsp;(obligatoire)</Text>}
      </Text>
      {tooltip && (
        <InfoBulle
          title={tooltip.help ?? "Plus d'informations"}
          isTooltipOpen={
            isTooltipOpen === undefined ? isLocalTooltipOpen : isTooltipOpen
          }
          onVisibilityChange={() => {
            tooltip.trackableFn?.(
              isTooltipOpen === undefined ? !isLocalTooltipOpen : isTooltipOpen
            );
            setIsLocalToolTipOpen(
              isTooltipOpen === undefined ? !isLocalTooltipOpen : isTooltipOpen
            );
            onSwitchTooltip?.();
          }}
        >
          {tooltip.content}
        </InfoBulle>
      )}
    </LabelBlock>
  );
};

const { breakpoints, fonts, spacings } = theme;

const LabelBlock = styled.label`
  display: block;
  margin: ${spacings.small} 0;
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
