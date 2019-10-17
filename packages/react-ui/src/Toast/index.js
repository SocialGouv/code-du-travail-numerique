import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { AlertTriangle, Info, Check, X } from "react-feather";
import { Button } from "../Button";

import { box, spacing } from "../theme";
import { fromTop, fromRight, fromBottom, fromLeft } from "../keyframes";

const VARIANT_TO_ICON = {
  info: Info,
  success: Check,
  warning: AlertTriangle
};

export const Toast = ({ children, onRemove, timeout, variant, ...props }) => {
  const Icon = VARIANT_TO_ICON[variant];

  useEffect(() => {
    let timer;
    if (timeout && onRemove) {
      timer = setTimeout(onRemove, timeout);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [onRemove, timeout]);

  return (
    <StyledToast variant={variant} {...props}>
      <IconWrapper variant={variant}>
        <Icon />
      </IconWrapper>
      <Content role="alert">{children}</Content>
      {onRemove && (
        <ButtonWrapper>
          <Button variant="icon" aria-label="Fermer" onClick={onRemove}>
            <X />
          </Button>
        </ButtonWrapper>
      )}
    </StyledToast>
  );
};

Toast.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["warning", "success", "info"]),
  wide: PropTypes.bool,
  shadow: PropTypes.bool,
  animate: PropTypes.oneOf([
    "from-top",
    "from-right",
    "from-bottom",
    "from-left"
  ]),
  timeout: PropTypes.number,
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired
};

Toast.defaultProps = {
  wide: false,
  variant: "info",
  animate: null,
  onRemove: null
};

const StyledToast = styled.div`
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: ${props => (props.wide ? "100%" : "auto")};
  min-height: 48px;
  color: ${({ theme }) => theme.darkText};
  background-color: ${({ theme }) => theme.white};
  border-color: ${({ theme, variant }) => theme[`${variant}Background`]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ shadow }) => (shadow ? box.shadow : "none")};
  animation: ${({ animate }) => {
    if (!animate) return "none";
    if (animate === "from-top") {
      return css`
        ${fromTop} 0.3s ease-out
      `;
    }
    if (animate === "from-right") {
      return css`
        ${fromRight} 500ms ease-out
      `;
    }
    if (animate === "from-bottom") {
      return css`
        ${fromBottom} 300ms ease-out
      `;
    }
    if (animate === "from-left") {
      return css`
        ${fromLeft} 500ms ease-out
      `;
    }
  }};
`;

const IconWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: flex-start;
  justify-content: center;
  padding: ${spacing.base};
  ${({ theme, variant }) => {
    return css`
      background-color: ${theme[`${variant}Background`]};
    `;
  }}
`;

const Content = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: ${spacing.base};
  color: ${({ theme }) => theme.darkText};
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: flex-start;
  justify-content: center;
`;
