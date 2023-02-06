import { icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export type TitleProps = {
  duration?: string;
  hasNoMarginBottom?: boolean;
  icon?: string;
  title: string;
  className?: string;
};

const Duration = ({ duration }: { duration: string }): JSX.Element => {
  return (
    <ToolDuration key="test">
      <TimeWithLabel aria-hidden="true" />
      <ToolDurationLabel>{duration}</ToolDurationLabel>
    </ToolDuration>
  );
};

const Index = ({
  title,
  icon,
  duration,
  hasNoMarginBottom,
  className,
}: TitleProps): JSX.Element => {
  const Icon = icons[icon];
  return (
    <ToolTitle hasNoMarginBottom={hasNoMarginBottom} className={className}>
      <StyledTitleBox>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleBox>
      {duration && <Duration duration={duration} />}
    </ToolTitle>
  );
};

export default Index;

const { breakpoints, spacings, fonts } = theme;

const ToolTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) =>
    props.hasNoMarginBottom ? "0px" : spacings.medium};
  padding-bottom: ${spacings.base};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: ${spacings.base};
    padding: ${spacings.base} 0 ${spacings.small} 0;
    border-bottom: 0;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
`;
const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.span`
  flex: 0 0 auto;
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${spacings.base};
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
