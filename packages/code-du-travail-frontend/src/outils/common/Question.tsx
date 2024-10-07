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
      <Text fontWeight="600" fontSize="hsmall">
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
                  : isTooltipOpen,
              );
              setIsLocalToolTipOpen(
                isTooltipOpen === undefined
                  ? !isLocalTooltipOpen
                  : isTooltipOpen,
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

const { spacings } = theme;

const StyledLegend = styled(Legend)`
  margin: ${spacings.small} 0;
`;
