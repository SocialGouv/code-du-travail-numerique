import React from "react";
import PropTypes from "prop-types";

const Category = ({ small, ...props }) => (
  <li
    className={`categories__list-item${
      small ? " categories__list-item--small" : ""
    }`}
    {...props}
  />
);

Category.propTypes = {
  small: PropTypes.bool
};

Category.defaultProps = {
  small: false
};

export default Category;
