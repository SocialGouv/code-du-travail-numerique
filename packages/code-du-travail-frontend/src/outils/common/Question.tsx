import { Legend, Text, theme } from "@socialgouv/cdtn-ui";
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
    <StyledLegend
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
        {tooltip && (
          <InfoBulle
            title={tooltip.help ?? "Plus d'informations"}
            isTooltipOpen={
              isTooltipOpen === undefined ? isLocalTooltipOpen : isTooltipOpen
            }
            onVisibilityChange={() => {
              tooltip.trackableFn?.(
                isTooltipOpen === undefined
                  ? !isLocalTooltipOpen
                  : isTooltipOpen
              );
              setIsLocalToolTipOpen(
                isTooltipOpen === undefined
                  ? !isLocalTooltipOpen
                  : isTooltipOpen
              );
              onSwitchTooltip?.();
            }}
          >
            {tooltip.content}
          </InfoBulle>
        )}
      </Text>
    </StyledLegend>
  );
};

const { breakpoints, fonts, spacings } = theme;

const StyledLegend = styled(Legend)`
  font-weight: 600;
  display: block;
  margin: ${spacings.small} 0;
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
  p,
  div {
    font-weight: 100 !important;
  }
`;
