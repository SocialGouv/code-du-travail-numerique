import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

export const Tooltip = ({
  background = "FFFFFF",
  children,
  position = "top",
  text,
  textColor = "3e486e",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const targetRef = useRef(null);
  const showTooltip = isHovered || isFocused;

  const handleClick = (e) => {
    e.preventDefault();
    if (targetRef.current) {
      targetRef.current.blur();
    }
  };

  return (
    <TooltipWrapper>
      <TooltipTarget
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleClick}
        ref={targetRef}
        showOnFocus={isFocused}
      >
        {children}
      </TooltipTarget>
      {showTooltip && (
        <CenterContainer position={position}>
          <TooltipBox
            background={background}
            textColor={textColor}
            position={position}
          >
            {text}
          </TooltipBox>
        </CenterContainer>
      )}
    </TooltipWrapper>
  );
};

Tooltip.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "right", "left", "bottom"]),
  text: PropTypes.node.isRequired,
  textColor: PropTypes.string,
};

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const TooltipTarget = styled.button`
  border: none;
  background: inherit;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
  display: flex;
  ${({ showOnFocus }) =>
    !showOnFocus &&
    css`
      outline: none;
    `};
`;

export const CenterContainer = styled.div`
  position: absolute;
  width: 200px;
  z-index: 1;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100% + 5px);
  pointer-events: none;
  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          bottom: unset !important;
          top: calc(100% + 5px);
        `;
      case "left":
        return css`
          margin-right: 0;
          left: unset;
          top: 50%;
          right: calc(100% + 5px);
          width: max-content;
        `;
      case "right":
        return css`
          margin-left: 0;
          top: 50%;
          left: calc(100% + 5px);
          width: max-content;
        `;
      default:
        return css`
          bottom: calc(100% + 5px);
        `;
    }
  }}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TooltipBox = styled.span`
  position: relative;
  background-color: #${(props) => props.background};
  color: #${(props) => props.textColor};
  text-align: center;
  border-radius: 5px;
  padding: 10px 8px;
  font-size: 1.25rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.2);

  animation: ${fadeIn} 100ms linear;

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: #${(props) => props.background} transparent transparent transparent;
    left: calc(50% - 4.5px);
    top: 100%;
  }

  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          &:after {
            border-color: transparent transparent #${(props) =>
                props.background} transparent;
            top: unset;
            width: 1px;
            bottom: 100%;
            left: calc(50% - 5px);
          }
        `;
      case "left":
        return css`
          &:after {
            border-color: transparent transparent transparent #${(props) => props.background};
            left: 100%;
            top: calc(50% - 5px);
          }
        `;
      case "right":
        return css`
          &:after {
            border-color: transparent #${(props) => props.background} transparent
              transparent;
            right: 100%;
            left: unset;
            top: calc(50% - 5px);
          }
        `;
      default:
        return css``;
    }
  }}
`;
