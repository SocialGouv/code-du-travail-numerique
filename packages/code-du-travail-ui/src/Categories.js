import React from "react";
import PropTypes from "prop-types";

const Categories = ({ className = "", ...props }) => (
  <div className="categories">
    <ul className={`categories__list ${className}`} {...props} />
  </div>
);

Categories.propTypes = {
  className: PropTypes.string
};

export default Categories;
