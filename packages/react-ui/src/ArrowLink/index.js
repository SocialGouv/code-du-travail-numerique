import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { animations, spacings } from "../theme";
import { DirectionRight } from "../icons";

export const ArrowLink = React.forwardRef(
  ({ arrowPosition, children, ...props }, ref) => (
    <StyledLink ref={ref} {...props}>
      {arrowPosition === "left" && (
        <StyledArrowRight arrowPosition={arrowPosition} />
      )}
      <StyledChildren>{children}</StyledChildren>
      {arrowPosition === "right" && (
        <StyledArrowRight arrowPosition={arrowPosition} />
      )}
    </StyledLink>
  )
);

ArrowLink.displayName = "ArrowLink";

ArrowLink.propTypes = {
  children: PropTypes.node.isRequired,
  arrowPosition: PropTypes.oneOf(["left", "right"])
};

ArrowLink.defaultProps = {
  arrowPosition: "right"
};

const StyledLink = styled.a`
  display: inline-flex;
  align-items: flex-start;
  text-decoration: none;
`;
const StyledChildren = styled.span`
  flex: 0 1 auto;
  width: auto;
`;

// eslint-disable-next-line no-unused-vars
export const StyledArrowRight = styled(({ arrowPosition, ...props }) => (
  <DirectionRight {...props} />
))`
  flex: 0 0 2.8rem;
  width: 2.8rem;
  height: 2.1rem;
  margin: ${({ arrowPosition }) =>
    arrowPosition === "left"
      ? `0 ${spacings.base} 0 0`
      : `0 ${spacings.tiny} 0 ${spacings.small}`};
  padding-top: 0.6rem;
  color: ${({ theme }) => theme.primary};
  transition: transform ${animations.transitionTiming} linear;
  /* stylelint-disable-next-line */
  ${StyledLink}:hover & {
    transform: translateX(4px);
  }
`;
