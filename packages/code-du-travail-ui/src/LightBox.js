import React from "react";
import PropTypes from "prop-types";

const LightBox = ({ title, children }) => (
  <div className="section-light">
    <div className="container">
      <div className="wrapper-light">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  </div>
);

LightBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

LightBox.defaultProps = {
  title: null,
  children: null
};

export default LightBox;
