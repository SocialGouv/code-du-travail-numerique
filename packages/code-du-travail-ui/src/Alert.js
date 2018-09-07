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

// return the 1st truthy prop that is one of an Alert versions
const getFlavor = props => {
  const versionProps = Object.keys(props).filter(
    // ensure value is truthy
    flavor => flavors.indexOf(flavor) > -1 && !!props[flavor]
  );
  return (versionProps.length && versionProps[0]) || "";
};

const Alert = props => (
  <div className={`alert alert__${getFlavor(props)}`} {...props} />
);

Alert.propTypes = {
  /** use .Alert.Alert__primary */
  primary: PropTypes.bool,
  /** use .Alert.Alert__secondary */
  secondary: PropTypes.bool,
  /** use .Alert.Alert__warning */
  warning: PropTypes.bool,
  /** use .Alert.Alert__success */
  success: PropTypes.bool,
  /** use .Alert.Alert__info */
  info: PropTypes.bool,
  /** use .Alert.Alert__danger */
  danger: PropTypes.bool,
  style: PropTypes.object
};

Alert.defaultProps = {
  primary: false,
  secondary: false,
  warning: false,
  success: false,
  info: false,
  danger: false
};

export default Alert;
