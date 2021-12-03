import { Alert, icons, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { InfoButtonIcon } from "./InfoButtonIcon";

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
}: Props): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState(false);
  const onChangeVisibility = (): void => {
    if (tooltip?.trackableFn) {
      tooltip.trackableFn(!isVisible);
    }
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <StyledMainDiv>
        <StyledLabel htmlFor={htmlFor} {...otherProps}>
          {children}{" "}
          {required && <Text fontWeight="400">&nbsp;(obligatoire)</Text>}
        </StyledLabel>
        {tooltip && (
          <InfoButtonIcon
            iconTitle={tooltip.help ?? "Plus d'informations"}
            handleClick={onChangeVisibility}
            icon={<icons.HelpCircle size="20" aria-label="?" />}
          />
        )}
      </StyledMainDiv>
      {tooltip && isVisible && (
        <AlertWithMargin size="small" variant="secondary">
          {tooltip.content}
        </AlertWithMargin>
      )}
    </div>
  );
};

const { breakpoints, fonts, spacings } = theme;

const AlertWithMargin = styled(Alert)`
  margin-top: ${spacings.base};
  margin-bottom: ${spacings.base};
`;

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${spacings.medium};
  margin-bottom: ${spacings.small};
  position: relative;
`;

const StyledLabel = styled.label`
  font-size: ${fonts.sizes.headings.small};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
  font-weight: 600;
  margin: 0;
`;
