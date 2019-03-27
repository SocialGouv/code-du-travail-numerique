import React from "react";
import PropTypes from "prop-types";

const Container = ({ className, ...props }) => (
  <div className={`container ${className}`} {...props} />
);

Container.propTypes = {
  className: PropTypes.string
};

Container.defaultProps = {
  className: ""
};

export default Container;
