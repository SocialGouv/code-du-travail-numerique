import React from "react";
import PropTypes from "prop-types";

export default function Tabs({ children, ...props }) {
  return (
    <ul className="tabs-wrapper" {...props}>
      {children}
    </ul>
  );
}

Tabs.propTypes = {
  children: PropTypes.node
};
