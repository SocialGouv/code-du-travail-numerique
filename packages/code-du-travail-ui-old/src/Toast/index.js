import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { AlertTriangle } from "react-feather";
import { Info } from "react-feather";
import { Check } from "react-feather";
import { X } from "react-feather";
import Button from "../Button";
import { box, colors, spacing } from "../theme";
import { fromTop, fromRight, fromBottom, fromLeft } from "../keyframes";

const VARIANT_TO_ICON = {
  info: Info,
  success: Check,
  warning: AlertTriangle
};

const Toast = ({
  animate,
  children,
  onRemove,
  timeout,
  variant,
  wide,
  ...props
}) => {
  let timer = null;

  const Icon = VARIANT_TO_ICON[variant];

  useEffect(() => {
    if (timer) {
      clearTimeout(this.timer);
    }
    if (timeout) {
      timer = setTimeout(onRemove, timeout);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout]);

  return (
    <StyledToast animate={animate} variant={variant} wide={wide} {...props}>
      <IconWrapper variant={variant}>
        <Icon />
      </IconWrapper>
      <Content role="alert">{children}</Content>
      {onRemove ? (
        <ButtonWrapper>
          <Button variant="icon" aria-label="Fermer" onClick={onRemove}>
            <X />
          </Button>
        </ButtonWrapper>
      ) : null}
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

export default Toast;

const StyledToast = styled.div`
  box-sizing: border-box;
  display: inline-flex;
  justify-content: space-between;
  min-height: 48px;
  width: ${props => (props.wide ? "100%" : "auto")};
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-radius: ${box.borderRadius};
  ${props => {
    let animation = "none";
    const borderColor = colors[`${props.variant}Background`];
    if (props.animate) {
      if (props.animate === "from-top") {
        animation = css`
          ${fromTop} 0.3s ease-out
        `;
      } else if (props.animate === "from-right") {
        animation = css`
          ${fromRight} 0.5s ease-out
        `;
      } else if (props.animate === "from-bottom") {
        animation = css`
          ${fromBottom} 0.3s ease-out
        `;
      } else if (props.animate === "from-left") {
        animation = css`
          ${fromLeft} 0.5s ease-out
        `;
      }
    }

    return css`
      animation: ${animation};
      border-color: ${borderColor};
      box-shadow: ${props.shadow ? box.shadow : "none"};
    `;
  }};
`;

const IconWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: flex-start;
  justify-content: center;
  padding: ${spacing.base};
  ${props => {
    return css`
      background-color: ${colors[`${props.variant}Background`]};
    `;
  }}
`;

const Content = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: ${spacing.base};
  color: ${colors.darkText};
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: flex-start;
  justify-content: center;
`;
