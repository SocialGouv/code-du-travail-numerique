import React from "react";
import PropTypes from "prop-types";

import {
  getFlavor,
  cleanProps,
  propTypes as flavorsPropTypes,
  defaultProps as flavorsDefaultProps
} from "../flavors";

const Tag = props => (
  <div className={`tag ${getFlavor(props, "tag")}`} {...cleanProps(props)} />
);

Tag.propTypes = {
  ...flavorsPropTypes,
  children: PropTypes.node.isRequired
};

Tag.defaultProps = {
  ...flavorsDefaultProps
};

export default Tag;
