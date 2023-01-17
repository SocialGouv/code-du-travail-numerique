import Link from "next/link";
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
        <Link href={new URL(props.href!)} passHref legacyBehavior>
          <a {...props} ref={ref} aria-label={`${children} (nouvelle fenêtre)`}>
            {children}
          </a>
        </Link>
      );
    }
    return (
      <Link href={new URL(props.href!)} passHref legacyBehavior>
        <a {...props} ref={ref}>
          {children}
        </a>
      </Link>
    );
  }
);

A11yLink.propTypes = {
  children: PropTypes.string.isRequired,
};
