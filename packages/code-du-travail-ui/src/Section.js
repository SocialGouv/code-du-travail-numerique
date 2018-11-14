import React from "react";
import PropTypes from "prop-types";

const Section = ({ light, dark, style, children }) => {
  const containerClassName = light
    ? "section-light"
    : dark
      ? "section-dark"
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.object,
  light: PropTypes.bool,
  dark: PropTypes.bool
};

Section.defaultProps = {
  light: false,
  dark: false
};

export default Section;
