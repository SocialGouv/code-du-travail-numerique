import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const ScreenReaderOnly = ({ type, children }) => {
  const Component = type === "inline" ? InlineSR : BlockSR;
  return <Component>{children}</Component>;
};

ScreenReaderOnly.propTypes = {
  type: PropTypes.oneOf(["block", "inline"]),
  children: PropTypes.node.isRequired
};

ScreenReaderOnly.defaultProps = {
  type: "block"
};

const InlineSR = styled.span`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const BlockSR = styled.div`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
