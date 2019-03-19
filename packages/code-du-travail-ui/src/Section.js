import React from "react";
import PropTypes from "prop-types";

const Section = ({ white, light, dark, style, children }) => {
  const containerClassName = light
    ? "section-light"
    : dark
    ? "section-dark"
    : white
    ? "section-white"
    : "section";
  const innerContainerClassName = light
    ? "wrapper-light"
    : dark
    ? "wrapper-dark"
    : "wrapper";
  return (
    <section className={containerClassName} style={style}>
      <div className="container">
        <div className={innerContainerClassName}>{children}</div>
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  white: PropTypes.bool
};

Section.defaultProps = {
  light: false,
  dark: false,
  white: false
};

export default Section;
