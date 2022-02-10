import { icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { IconWrapper } from "./components/IconWrapper";

type WizardTitleProps = {
  duration?: string;
  hasNoMarginBottom?: boolean;
  icon?: string;
  stepIndex?: number;
  title: string;
};

export function WizardTitle({
  title,
  icon,
  duration,
  stepIndex,
  hasNoMarginBottom,
}: WizardTitleProps): JSX.Element {
  const Icon = icons[icon];
  return (
    <ToolTitle hasNoMarginBottom={hasNoMarginBottom}>
      <StyledTitleBox>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleBox>
      {duration && stepIndex === 0 && <WizardDuration duration={duration} />}
    </ToolTitle>
  );
}

//TODO: virer ça de là
function WizardDuration({ duration }) {
  return (
    <ToolDuration>
      <TimeWithLabel aria-hidden="true" />
      <ToolDurationLabel>{duration}</ToolDurationLabel>
    </ToolDuration>
  );
}

const { breakpoints, spacings, fonts } = theme;

//TODO: refactor tout ça
const ToolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) =>
    props.hasNoMarginBottom ? "0px" : spacings.large};
  padding-bottom: ${spacings.base};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacings.base};
    padding: ${spacings.base} 0 ${spacings.small} 0;
    border-bottom: 0;
  }
`;

const ToolDuration = styled.div`
  position: relative;
  padding-right: 45px;
`;
const ToolDurationLabel = styled.span`
  position: absolute;
  bottom: 3px;
  left: 28px;
  font-size: ${fonts.sizes.tiny};
  color: ${({ theme }) => theme.paragraph};
`;
const TimeWithLabel = styled(icons.TimeWithLabel)`
  width: 4.2rem;
`;
const StyledTitle = styled.h1`
  margin: 0;
`;
const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
`;
