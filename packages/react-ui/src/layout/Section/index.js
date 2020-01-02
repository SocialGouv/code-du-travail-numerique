import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
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

export const Section = ({ decorated, large, variant, ...props }) => {
  if (decorated) {
    return (
      <StyledSection large={large} decorated>
        <Decoration variant={variant} />
        <Content {...props} />
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
        padding: ${large ? "7rem" : spacings.large} 0
          ${large ? "6rem" : "0.1rem"}; /* TODO find a proper way to deal with margins here */
        min-height: ${BORDER_RADIUS};
      `;
    }
  }}
  color: ${({ theme }) => theme.paragraph};
`;

const Decoration = styled.div`
  position: absolute;
  top: 0;
  right: 35%;
  bottom: 0;
  left: 0;
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  ${assignBackgroundColor};
  border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
  content: "";
  @media (max-width: ${breakpoints.mobile}) {
    right: ${spacings.medium};
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
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};

Section.defaultProps = {
  decorated: false,
  large: false,
  variant: "default"
};
