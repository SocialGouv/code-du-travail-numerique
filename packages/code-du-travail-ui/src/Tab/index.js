import React from "react";
import PropTypes from "prop-types";

export default function Tab({ children, active, ...props }) {
  return (
    <li className={`tab ${active ? "active" : ""}`} {...props}>
      {children}
    </li>
  );
}

Tab.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool
};
