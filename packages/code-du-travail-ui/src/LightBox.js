import React from "react";
import PropTypes from "prop-types";

const LightBox = ({ title, style, children }) => (
  <Section light style={style}>
    {(title && <h2>{title}</h2>) || null}
    {children}
  </Section>
);

LightBox.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.element
};

LightBox.defaultProps = {
  title: null,
  children: null
};

export default LightBox;
