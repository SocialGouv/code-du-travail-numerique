import React from "react";
import PropTypes from "prop-types";

export const flavors = [
  "primary",
  "secondary",
  "warning",
  "success",
  "info",
  "danger"
];

// return the 1st truthy prop that is one of an Button versions
const getFlavor = props => {
  const versionProps = Object.keys(props).filter(
    // ensure value is truthy
    flavor => flavors.indexOf(flavor) > -1 && !!props[flavor]
  );
  return (versionProps.length && versionProps[0]) || "";
};

const Button = props => (
  <div className={`btn btn__${getFlavor(props)}`} {...props} />
);

Button.propTypes = {
  /** use .btn.btn__primary */
  primary: PropTypes.bool,
  /** use .btn.btn__secondary */
  secondary: PropTypes.bool,
  /** use .btn.btn__warning */
  warning: PropTypes.bool,
  /** use .btn.btn__success */
  success: PropTypes.bool,
  /** use .btn.btn__info */
  info: PropTypes.bool,
  /** use .btn.btn__danger */
  danger: PropTypes.bool,
  style: PropTypes.object
};

Button.defaultProps = {
  primary: false,
  secondary: false,
  warning: false,
  success: false,
  info: false,
  danger: false
};

export default Button;
