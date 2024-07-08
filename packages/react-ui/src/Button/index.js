import { Button as ButtonDsfr } from "@codegouvfr/react-dsfr/Button";
import PropTypes from "prop-types";
import React from "react";

import { DirectionRight } from "../icons/index.js";

export const Button = React.forwardRef(
  ({ children, icon: Icon, onClick, ...props }, ref) => {
    const StyledCustomIcon = Icon || DirectionRight;
    return (
      <ButtonDsfr {...props} ref={ref} onClick={onClick}>
        {children}
        {props.variant === "link" && <StyledCustomIcon />}
      </ButtonDsfr>
    );
  }
);
Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.elementType,
  narrow: PropTypes.bool,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  variant: PropTypes.oneOf([
    "link",
    "navLink",
    "flat",
    "naked",
    "primary",
    "secondary",
    "light",
  ]),
};

Button.defaultProps = {
  children: "",
  narrow: false,
  onClick: () => {},
  small: false,
  variant: "secondary",
  xsmall: false,
};
