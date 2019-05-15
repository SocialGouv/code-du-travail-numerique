import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import IconWarning from "react-feather/dist/icons/alert-triangle";
import IconInfo from "react-feather/dist/icons/info";
import IconSuccess from "react-feather/dist/icons/check";
import IconClose from "react-feather/dist/icons/x";
import Button from "../Button";
import { box, colors, fonts, spacing } from "../theme";
import { fromTop, fromRight, fromBottom, fromLeft } from "../keyframes";

const Toast = ({
  animate,
  children,
  className,
  onRemove,
  timeout,
  type,
  wide
}) => {
  let timer = null;
  let Icon = IconInfo;
  if (type === "warning") Icon = IconWarning;
  if (type === "success") Icon = IconSuccess;

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
    <StyledToast
      animate={animate}
      type={type}
      wide={wide}
      className={className}
    >
      <IconWrapper type={type}>
        <Icon />
      </IconWrapper>
      <Content role="alert">{children}</Content>
      {onRemove ? (
        <ButtonWrapper>
          <Button variant="icon" aria-label="Fermer" onClick={onRemove}>
            <IconClose />
          </Button>
        </ButtonWrapper>
      ) : null}
    </StyledToast>
  );
};

Toast.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["warning", "success", "info"]),
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
  type: "info",
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
    const borderColor = colors[`${props.type}Background`];
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
  font-size: ${fonts.sizeH1};

  ${props => {
    let backgroundColor = colors.infoBackground;
    if (props.type === "warning") {
      backgroundColor = colors.warningBackground;
    }
    if (props.type === "success") {
      backgroundColor = colors.successBackground;
    }
    return css`
      background-color: ${backgroundColor};
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
