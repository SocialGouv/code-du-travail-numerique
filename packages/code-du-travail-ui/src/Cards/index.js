import React from "react";
import PropTypes from "prop-types";

export default function Cards({ children, ...props }) {
  return (
    <ul className="card-wrapper" {...props}>
      {children}
    </ul>
  );
}

Cards.propTypes = {
  children: PropTypes.node
};
