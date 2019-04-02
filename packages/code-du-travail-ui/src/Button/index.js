import React from "react";
import PropTypes from "prop-types";

import {
  getFlavor,
  cleanProps,
  propTypes as flavorsPropTypes,
  defaultProps as flavorsDefaultProps
} from "../flavors";

const Button = ({ onClick, onKeyUp, small = "", className = "", ...props }) => {
  return (
    <div
      tabIndex="0"
      role="button"
      className={`btn ${getFlavor(props, "btn")} ${small &&
        "btn--small"} ${className}`}
      onKeyDown={event => {
        /* Space & Enter */
        if (event.keyCode === 32 || event.keyCode === 13) {
          event.preventDefault();
          if (onClick) {
            onClick();
          }
        }
        if (onKeyUp) {
          onKeyUp(event);
        }
      }}
      onClick={event => {
        if (onClick) {
          onClick(event);
        }
      }}
      {...cleanProps(props)}
    />
  );
};

Button.propTypes = {
  ...flavorsPropTypes,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object
};

Button.defaultProps = {
  ...flavorsDefaultProps
};

export default Button;
