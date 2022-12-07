import { transparentize } from "polished";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { breakpoints } from "../theme.js";

export const OverflowWrapper = ({
  children,
  mobileOnly = false,
  shadowColor,
  ...props
}) => {
  const scrollableElement = useRef(null);
  const [isAtFarLeft, setIsAtFarLeft] = useState(true);
  const [isAtFarRight, setIsAtFarRight] = useState(true);

  useEffect(() => {
    function onResize() {
      const { offsetWidth, scrollWidth } = scrollableElement.current;
      if (scrollWidth <= offsetWidth) {
        if (!isAtFarLeft) setIsAtFarLeft(true);
        if (!isAtFarRight) setIsAtFarRight(true);
      } else {
        onScroll();
      }
    }

    function onScroll() {
      const {
        offsetWidth,
        scrollLeft,
        scrollWidth,
      } = scrollableElement.current;
      const scrolled = scrollLeft + offsetWidth;
      if (scrollLeft !== 0) {
        if (isAtFarLeft) setIsAtFarLeft(false);
      } else if (!isAtFarLeft) {
        setIsAtFarLeft(true);
      }
      if (scrolled !== scrollWidth) {
        if (isAtFarRight) setIsAtFarRight(false);
      } else if (!isAtFarRight) {
        setIsAtFarRight(true);
      }
    }

    onResize();
    // we need to keep track of the current element cause it
    // may change before we remove the event listener
    const currentScrollableElement = scrollableElement.current;
    window.addEventListener("resize", onResize);
    currentScrollableElement.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", onResize);
      currentScrollableElement.removeEventListener("scroll", onScroll);
    };
  });
  return (
    <StyledDiv
      hasShadowLeft={!isAtFarLeft}
      hasShadowRight={!isAtFarRight}
      mobileOnly={mobileOnly}
      shadowColor={shadowColor}
      {...props}
    >
      <StyledOverflowWrapper mobileOnly={mobileOnly} ref={scrollableElement}>
        {children}
      </StyledOverflowWrapper>
    </StyledDiv>
  );
};

OverflowWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  mobileOnly: PropTypes.bool,
  shadowColor: PropTypes.string,
};

const StyledDiv = styled.div`
  position: relative;
  overflow: ${({ mobileOnly }) => (mobileOnly ? "visible" : "hidden")};
  @media (max-width: ${breakpoints.mobile}) {
    overflow-x: hidden;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: ${({ mobileOnly }) => (mobileOnly ? "none" : "block")};
    width: 4rem;
    opacity: 0;
    transition: opacity 0.3s linear;
    content: "";
    pointer-events: none;
    ${({ shadowColor, theme }) => css`
      background: radial-gradient(
        ellipse at center,
        ${shadowColor || theme.white} 15%,
        ${transparentize(1, shadowColor || theme.white)} 80%
      );
    `}
    @media (max-width: ${breakpoints.mobile}) {
      display: block;
    }
  }
  &:before {
    left: -2rem;
    ${({ hasShadowLeft }) =>
      hasShadowLeft &&
      css`
        opacity: 1;
      `}
  }
  &:after {
    right: -2rem;
    ${({ hasShadowRight }) =>
      hasShadowRight &&
      css`
        opacity: 1;
      `}
  }
`;

const StyledOverflowWrapper = styled.div`
  overflow-x: ${({ mobileOnly }) => (mobileOnly ? "visible" : "auto")};
  @media (max-width: ${breakpoints.mobile}) {
    overflow-x: auto;
  }
`;
