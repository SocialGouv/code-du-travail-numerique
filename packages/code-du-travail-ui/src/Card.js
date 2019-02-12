import React from "react";
import PropTypes from "prop-types";

export default function Card({ children, ...props }) {
  return (
    <li className="card" {...props}>
      {children}
    </li>
  );
}

Card.propTypes = {
  children: PropTypes.node
};
