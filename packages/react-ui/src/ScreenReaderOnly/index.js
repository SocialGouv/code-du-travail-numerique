import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const ScreenReaderOnly = React.forwardRef(
  ({ type, children, ...props }, ref) => {
    return type === "inline" ? (
      <SROnly as="span" {...props} ref={ref}>
        {children}
      </SROnly>
    ) : (
      <SROnly {...props} ref={ref}>
        {children}
      </SROnly>
    );
  }
);

ScreenReaderOnly.displayName = "ScreenReaderOnly";

ScreenReaderOnly.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["block", "inline"]),
};

ScreenReaderOnly.defaultProps = {
  type: "block",
};

/**
 * From twiter bootstrap v4
 */
const SROnly = styled.div`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  margin: -1px !important;
  padding: 0 !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  border: 0 !important;
  clip: rect(0, 0, 0, 0) !important;
`;
