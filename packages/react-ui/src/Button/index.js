import PropTypes from "prop-types";
import React from "react";

import { DirectionRight } from "../icons/index.js";

export const Button = React.forwardRef(
  ({ children, icon: Icon, ...props }, ref) => {
    const StyledCustomIcon = Icon || DirectionRight;
    return (
      <button className="fr-btn" {...props} ref={ref}>
        {children}
        {props.variant === "link" && <StyledCustomIcon />}
      </button>
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
