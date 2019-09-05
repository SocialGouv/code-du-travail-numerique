import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { colors } from "../theme";

const OverflowWrapper = ({ children, shadowColor, ...props }) => {
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
        scrollWidth
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
    <ShadowContainer
      hasShadowLeft={!isAtFarLeft}
      hasShadowRight={!isAtFarRight}
      shadowColor={shadowColor}
      {...props}
    >
      <StyledOverflowWrapper ref={scrollableElement}>
        {children}
      </StyledOverflowWrapper>
    </ShadowContainer>
  );
};

OverflowWrapper.propTypes = {
  shadowColor: PropTypes.string,
  children: PropTypes.node.isRequired
};

OverflowWrapper.defaultProps = {
  shadowColor: colors.white
};

export default OverflowWrapper;

const ShadowContainer = styled.div`
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    display: block;
    width: 4rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s linear;
    ${({ shadowColor }) => css`
      background: radial-gradient(
        ellipse at center,
        ${shadowColor} 15%,
        ${transparentize(1, shadowColor)} 80%
      );
    `}
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
  overflow-x: auto;
`;
