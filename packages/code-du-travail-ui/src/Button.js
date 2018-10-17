import React from "react";
import PropTypes from "prop-types";

import {
  getFlavor,
  cleanProps,
  propTypes as flavorsPropTypes,
  defaultProps as flavorsDefaultProps
} from "./flavors";

const Button = props => (
  <div className={`btn btn__${getFlavor(props)}`} {...cleanProps(props)} />
);

Button.propTypes = {
  ...flavorsPropTypes,
  style: PropTypes.object
};

Button.defaultProps = {
  ...flavorsDefaultProps
};

export default Button;
