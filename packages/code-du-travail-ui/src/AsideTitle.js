import React from "react";
import PropTypes from "prop-types";

const AsideTitle = ({ style, children }) => {
  return (
    <h3 className="aside-title" style={style}>
      {children}
    </h3>
  );
};

AsideTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ]).isRequired,
  style: PropTypes.object
};

export default AsideTitle;
