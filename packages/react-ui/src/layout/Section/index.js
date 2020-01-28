import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Container } from "../../layout/Container";
import { breakpoints, spacings } from "../../theme";

const BORDER_RADIUS = "10rem";

const assignBackgroundColor = ({ variant, theme }) => {
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

export const Section = ({
  decorated,
  large,
  innerTopContent,
  innerBottomContent,
  variant,
  ...props
}) => {
  if (decorated) {
    return (
      <StyledSection large={large} decorated>
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

const StyledSection = styled.div`
  ${({ decorated, large, theme }) => {
    if (!decorated || theme.noColors) {
      return css`
        padding: ${spacings.large} 0;
        ${assignBackgroundColor};
      `;
    }
    if (decorated) {
      return css`
        position: relative;
        margin: ${large ? "6rem" : "5rem"} 0;
        padding: ${large ? "6rem" : spacings.large} 0;
        min-height: ${BORDER_RADIUS};
        @media (max-width: ${breakpoints.mobile}) {
          ${large && `margin: ${spacings.large} 0 ${spacings.larger};`}
          ${large && `padding: ${spacings.large} 0 ${spacings.larger};`}
        }
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
  padding-right: ${SPACING_RIGHT};
  @media (max-width: ${breakpoints.mobile}) {
    padding-right: ${SPACING_RIGHT_MOBILE};
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 0;
`;

Section.propTypes = {
  children: PropTypes.node.isRequired,
  decorated: PropTypes.bool,
  large: PropTypes.bool,
  innerTopContent: PropTypes.node,
  innerBottomContent: PropTypes.node,
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};

Section.defaultProps = {
  decorated: false,
  large: false,
  innerTopContent: null,
  innerBottomContent: null,
  variant: "default"
};
