import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import IconWarning from "react-feather/dist/icons/alert-triangle";
import IconInfo from "react-feather/dist/icons/info";
import IconSuccess from "react-feather/dist/icons/check";
import IconClose from "react-feather/dist/icons/x";
import ToggleButton from "../ToggleButton";
import { box, colors, fonts, spacing } from "../theme";
import { fromTop, fromRight, fromBottom, fromLeft } from "../keyframes";

/**
 * Toast element used to show a message with a specific background
 */
class Toast extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    const { timeout } = this.props;

    if (timeout) {
      this.timer = setTimeout(() => {
        this.props.onRemove();
      }, timeout);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { animate, onRemove, type, wide } = this.props;
    let Icon = IconInfo;
    if (type === "warning") Icon = IconWarning;
    if (type === "success") Icon = IconSuccess;

    return (
      <StyledToast type={type} animate={animate} wide={wide}>
        <IconWrapper type={type}>
          <Icon />
        </IconWrapper>
        <Content role="alert">{this.props.children}</Content>
        {onRemove ? (
          <ButtonWrapper>
            <ToggleButton kind="icon" onClick={onRemove}>
              <IconClose />
            </ToggleButton>
          </ButtonWrapper>
        ) : null}
      </StyledToast>
    );
  }
}

Toast.propTypes = {
  /**
   * Type of toast to show
   */
  type: PropTypes.oneOf(["warning", "success", "info"]),
  /**
   * Whether the toast should be wide or not
   */
  wide: PropTypes.bool,
  /**
   * Whether the toast should animate on display
   */
  animate: PropTypes.oneOf([
    "from-top",
    "from-right",
    "from-bottom",
    "from-left"
  ]),
  /**
   * false to disable auto dismiss
   * integer to indicate timeout in ms
   */
  timeout: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /**
   * Function to call when toast is removed
   */
  onRemove: PropTypes.func,
  /**
   * Content
   */
  children: PropTypes.node.isRequired
};

Toast.defaultProps = {
  wide: false,
  type: "info",
  animate: null,
  timeout: false,
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
  border-color: var(--infoColor);
  border-style: solid;
  border-width: 1px;
  border-radius: ${box.borderRadius};
  ${props => {
    let animation = "none";
    let borderColor = colors.infoBackground;
    if (props.type === "warning") {
      borderColor = colors.warningBackground;
    } else if (props.type === "success") {
      borderColor = colors.successBackground;
    }
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
    `;
  }}
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
  display: flex;
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
