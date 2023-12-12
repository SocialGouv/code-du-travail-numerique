import React from "react";
import styled, { css } from "styled-components";

import {
  Container,
  CONTAINER_MAX_WIDTH,
} from "../../layout/Container/index.js";
import { breakpoints, spacings } from "../../theme";

const BORDER_RADIUS = "10rem";

type Variants = "default" | "white" | "light" | "dark";

const assignBackgroundColor = ({
  variant,
  theme,
}: {
  variant?: Variants;
  theme: any;
}) => {
  let backgroundColor = "transparent";
  if (variant === "white") {
    backgroundColor = theme.white;
  }
  if (variant === "light") {
    backgroundColor = theme.bgSecondary;
  }
  if (variant === "dark") {
    backgroundColor = theme.bgTertiary;
  }
  return css`
    background-color: ${backgroundColor};
  `;
};

type SectionProps = {
  decorated?: Boolean;
  innerBottomContent?: React.ReactNode;
  innerTopContent?: React.ReactNode;
  large?: Boolean;
  variant?: Variants;
};

export const Section = ({
  decorated = false,
  large = false,
  innerTopContent,
  innerBottomContent,
  variant = "default",
  ...props
}: React.PropsWithChildren<SectionProps>) => {
  if (decorated) {
    return (
      <StyledSection large={large} decorated={decorated}>
        <Decoration variant={variant} />
        {innerTopContent && (
          <PaddedContainer>{innerTopContent}</PaddedContainer>
        )}
        <Content {...props} />
        {innerBottomContent && (
          <PaddedContainer>{innerBottomContent}</PaddedContainer>
        )}
      </StyledSection>
    );
  }
  return <StyledSection variant={variant} {...props} />;
};

type StyledSectionProps = {
  decorated?: Boolean;
  large?: Boolean;
  variant?: Variants;
};

const StyledSection = styled.div<StyledSectionProps>`
  ${({ decorated, large, theme }) => {
    if (!decorated || theme.noColors) {
      return css`
        padding: ${spacings.large} 0;
        ${assignBackgroundColor};
        @media (max-width: ${breakpoints.mobile}) {
          padding: ${spacings.xmedium} 0;
        }
      `;
    }
    if (decorated) {
      return css`
        position: relative;
        margin: ${large ? "6rem" : "5rem"} 0;
        padding: ${large ? "6rem" : spacings.large} 0;
        min-height: ${BORDER_RADIUS};
        ${large &&
        `
            @media (max-width: ${breakpoints.mobile}) {
              margin: ${spacings.large} 0 ${spacings.larger};
              padding: ${spacings.large} 0 ${spacings.larger};
            }
        `}
      `;
    }
  }}
  color: ${({ theme }) => theme.paragraph};
`;

const SPACING_RIGHT = "30%";
const SPACING_RIGHT_MOBILE = spacings.medium;

const Decoration = styled.div`
  position: absolute;
  top: 0;
  right: ${SPACING_RIGHT};
  bottom: 0;
  left: 0;
  z-index: -1;
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  ${assignBackgroundColor};
  border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
  content: "";
  @media (max-width: ${breakpoints.mobile}) {
    right: ${SPACING_RIGHT_MOBILE};
  }
`;

const PaddedContainer = styled(Container)`
  /*
    The issue here is that the container has a max width so the
    padding right cannot simply equals the SPACING_RIGHT of the section
    when the width is too big.
    To get the correct padding-right, we need some calculation:
      IF
        X = the missing padding-right to add to the container
        Y = margin-right of the container (which is dynamic, because auto)
      NOWING THAT
        Y = (100% - CONTAINER_MAX_WIDTH) / 2
        SPACING_RIGHT = X + Y
      THEN
        X = SPACING_RIGHT - (100% - CONTAINER_MAX_WIDTH) / 2
  */
  padding-right: calc(
    ${SPACING_RIGHT} - (100% - ${CONTAINER_MAX_WIDTH}) / 2 + ${spacings.medium}
  );
  @media (max-width: ${breakpoints.desktop}) {
    padding-right: calc(${SPACING_RIGHT} + ${spacings.medium});
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding-right: calc(${SPACING_RIGHT_MOBILE} + ${spacings.small});
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 0;
`;
