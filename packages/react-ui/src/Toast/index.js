import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { X } from "react-feather";
import styled, { css } from "styled-components";

import { Button } from "../Button/index.js";
import { fromBottom, fromLeft, fromRight, fromTop } from "../keyframes.js";
import { box, spacings } from "../theme.js";

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
          <StyledX aria-hidden="true" variant={variant} />
        </Button>
      )}
    </StyledToast>
  );
};

Toast.propTypes = {
  animate: PropTypes.oneOf([
    "from-top",
    "from-right",
    "from-bottom",
    "from-left",
  ]),
  children: PropTypes.node.isRequired,
  onRemove: PropTypes.func,
  shadow: PropTypes.bool,
  squared: PropTypes.bool,
  timeout: PropTypes.number,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  wide: PropTypes.bool,
};

Toast.defaultProps = {
  animate: null,
  onRemove: null,
  squared: false,
  variant: "secondary",
  wide: false,
};

const StyledToast = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  width: ${(props) => (props.wide ? "100%" : "auto")};
  min-height: 48px;
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.white};
  border-color: ${({ theme, variant }) => theme[variant]};
  border-style: solid;
  border-width: 2px;
  border-radius: ${({ squared }) => (squared ? "0" : box.borderRadius)};
  box-shadow: ${({ shadow, theme, variant }) =>
    shadow ? box.shadow.large(theme[variant]) : "none"};
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
  @media print {
    display: none;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: ${spacings.small} ${spacings.base};
  text-align: left;
`;

const StyledX = styled(X)`
  margin-top: ${spacings.tiny};
  color: ${({ theme, variant }) => theme[variant]};
`;
