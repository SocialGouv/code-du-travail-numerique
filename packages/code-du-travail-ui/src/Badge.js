import React from "react";
import PropTypes from "prop-types";

import {
  getFlavor,
  cleanProps,
  propTypes as flavorsPropTypes,
  defaultProps as flavorsDefaultProps
} from "./flavors";

const Badge = props => (
  <div
    className={`badge ${getFlavor(props, "badge")}`}
    {...cleanProps(props)}
  />
);

Badge.propTypes = {
  ...flavorsPropTypes,
  style: PropTypes.object
};

Badge.defaultProps = {
  ...flavorsDefaultProps
};

export default Badge;
