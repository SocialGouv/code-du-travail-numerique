import React from "react";
import PropTypes from "prop-types";
const Button = props => {
  const { onPress, onClick, onKeyUp, children } = props;
  return (
    <div
      tabIndex="0"
      role="button"
      className="btn"
      onKeyDown={event => {
        /* Space & Enter */
        if (event.keyCode === 32 || event.keyCode === 13) {
          event.preventDefault();
          if (onPress) {
            onPress();
          }
          if (onClick) {
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
    >
      {children}
    </div>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object
};

export { Button };
