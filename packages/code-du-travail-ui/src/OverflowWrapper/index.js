import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { colors } from "../theme";

const OverflowWrapper = ({ children, shadowColor, ...props }) => {
  const scrollableElement = useRef(null);
  const [isAtFarLeft, setIsAtFarLeft] = useState(true);
  const [isAtFarRight, setIsAtFarRight] = useState(false);

  function onScroll(event) {
    const { offsetWidth, scrollLeft, scrollWidth } = event.target;
    const scrolled = scrollLeft + offsetWidth;
    if (scrollLeft !== 0) {
      if (isAtFarLeft) setIsAtFarLeft(false);
      if (scrolled !== scrollWidth) {
        if (isAtFarRight) setIsAtFarRight(false);
      } else if (!isAtFarRight) {
        setIsAtFarRight(true);
      }
    } else if (!isAtFarLeft) {
      setIsAtFarLeft(true);
    }
  }

  useEffect(() => {
    scrollableElement.current.addEventListener("scroll", onScroll);
    return () => {
      scrollableElement.current.removeEventListener("scroll", onScroll);
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
    opacity: 1;
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
      !hasShadowLeft &&
      css`
        opacity: 0;
      `}
  }
  &:after {
    right: -2rem;
    ${({ hasShadowRight }) =>
      !hasShadowRight &&
      css`
        opacity: 0;
      `}
  }
`;

const StyledOverflowWrapper = styled.div`
  overflow-x: auto;
`;
