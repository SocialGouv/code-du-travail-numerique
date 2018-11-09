import React from "react";
import PropTypes from "prop-types";

import {
  getFlavor,
  cleanProps,
  propTypes as flavorsPropTypes,
  defaultProps as flavorsDefaultProps
} from "./flavors";

const Button = props => {
  const { onPress, onClick, onKeyUp } = props;
  return (
    <div
      tabIndex="0"
      role="button"
      className={`btn ${getFlavor(props, "btn")}`}
      onKeyDown={event => {
        /* Space & Enter */
        if (event.keyCode === 32 || event.keyCode === 13) {
          event.preventDefault();
          if (onPress) {
            onPress();
          } else if (onClick) {
            onClick();
          }
        }
        if (onKeyUp) {
          onKeyUp(event);
        }
      }}
      onClick={event => {
        if (onPress) {
          onPress();
        }
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
  onPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object
};

Button.defaultProps = {
  ...flavorsDefaultProps
};

export default Button;
