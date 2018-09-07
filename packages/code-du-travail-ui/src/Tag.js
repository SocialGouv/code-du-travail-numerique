import React from "react";
import PropTypes from "prop-types";

const style = {
  background: "#005994",
  color: "white",
  fontSize: "14px",
  display: "inline-block",
  margin: "10px",
  lineHeight: "14px",
  padding: "7px 10px 7px 10px",
  minWidth: "70px",
  borderRadius: "4px",
  textAlign: "center"
};

const Tag = props => <div style={style} {...props} />;

Tag.propTypes = {
  children: PropTypes.element.isRequired
};

Tag.defaultProps = {};

export default Tag;
