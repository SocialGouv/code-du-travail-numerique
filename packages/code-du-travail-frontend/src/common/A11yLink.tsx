import PropTypes from "prop-types";
import React from "react";

type Props = {
  children: string;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const A11yLink = React.forwardRef<HTMLAnchorElement, Props>(
  function A11yLink({ children, ...props }, ref) {
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
  }
);

A11yLink.propTypes = {
  children: PropTypes.string.isRequired,
};
