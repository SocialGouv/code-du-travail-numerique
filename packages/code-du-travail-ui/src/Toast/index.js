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
    const { onRemove, type, className } = this.props;
    let Icon = IconInfo;
    if (type === "warning") Icon = IconWarning;
    if (type === "success") Icon = IconSuccess;

    return (
      <div className={className}>
        <IconWrapper type={type}>
          <Icon />
        </IconWrapper>
        <Content role="alert">{this.props.children}</Content>
        {onRemove ? (
          <ButtonWrapper>
            <ToggleButton variant="icon" onClick={onRemove}>
              <IconClose />
            </ToggleButton>
          </ButtonWrapper>
        ) : null}
      </div>
    );
  }
}

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
  timeout: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onRemove: PropTypes.func,
  children: PropTypes.node.isRequired
};

Toast.defaultProps = {
  wide: false,
  type: "info",
  animate: null,
  timeout: false,
  onRemove: null
};

const StyledToast = styled(Toast)`
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

export default StyledToast;
