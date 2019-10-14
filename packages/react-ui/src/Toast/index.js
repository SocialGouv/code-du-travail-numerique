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
  box-sizing: border-box;
  display: inline-flex;
  justify-content: space-between;
  min-height: 48px;
  width: ${props => (props.wide ? "100%" : "auto")};
  color: ${({ theme }) => theme.darkText};
  background-color: ${({ theme }) => theme.white};
  border-style: solid;
  border-width: 1px;
  border-radius: ${box.borderRadius};
  ${({ animate, shadow, theme, variant }) => {
    let animation = "none";
    const borderColor = theme[`${variant}Background`];
    if (animate) {
      if (animate === "from-top") {
        animation = css`
          ${fromTop} 0.3s ease-out
        `;
      } else if (animate === "from-right") {
        animation = css`
          ${fromRight} 0.5s ease-out
        `;
      } else if (animate === "from-bottom") {
        animation = css`
          ${fromBottom} 0.3s ease-out
        `;
      } else if (animate === "from-left") {
        animation = css`
          ${fromLeft} 0.5s ease-out
        `;
      }
    }

    return css`
      animation: ${animation};
      border-color: ${borderColor};
      box-shadow: ${shadow ? box.shadow : "none"};
    `;
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
