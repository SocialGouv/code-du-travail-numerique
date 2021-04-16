import PropTypes from "prop-types";
import React from "react";

export const A11yLink = React.forwardRef(function A11yLink(
  { children, ...props },
  ref
) {
  if (props.target === "_blank") {
    return (
      <a {...props} ref={ref} aria-label={`${children} (nouvelle fenêtre)`}>
        {children}
      </a>
    );
  }
  return (
    <a {...props} ref={ref}>
      {children}
    </a>
  );
});

A11yLink.propTypes = {
  children: PropTypes.string.isRequired,
};
