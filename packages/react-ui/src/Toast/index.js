import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { X } from "react-feather";
import { Button } from "../Button";

import { box, spacings } from "../theme";
import { fromTop, fromRight, fromBottom, fromLeft } from "../keyframes";

export const Toast = ({ children, onRemove, timeout, variant, ...props }) => {
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
      <Content role="alert">{children}</Content>
      {onRemove && (
        <Button
          variant="naked"
          narrow
          small
          aria-label="Fermer"
          onClick={onRemove}
        >
          <StyledX variant={variant} />
        </Button>
      )}
    </StyledToast>
  );
};

Toast.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
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
  variant: "secondary",
  animate: null,
  onRemove: null
};

const StyledToast = styled.div`
  display: inline-flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: ${props => (props.wide ? "100%" : "auto")};
  min-height: 48px;
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.white};
  border-color: ${({ theme, variant }) => theme[`${variant}`]};
  border-style: solid;
  border-width: 2px;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ shadow }) => (shadow ? box.shadow.default : "none")};
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

const Content = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: ${spacings.small} ${spacings.base};
  color: ${({ theme }) => theme.paragraph};
  text-align: left;
`;

const StyledX = styled(X)`
  margin-top: ${spacings.tiny};
  color: ${({ theme, variant }) => theme[`${variant}`]};
`;
