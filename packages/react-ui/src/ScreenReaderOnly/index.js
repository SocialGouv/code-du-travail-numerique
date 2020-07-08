import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const ScreenReaderOnly = ({ type, ...props }) => {
  const Component = type === "inline" ? InlineSR : BlockSR;
  return <Component {...props} />;
};

ScreenReaderOnly.propTypes = {
  type: PropTypes.oneOf(["block", "inline"]),
};

ScreenReaderOnly.defaultProps = {
  type: "block",
};

const InlineSR = styled.span`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0, 0, 0, 0);
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
    border: 0;
    clip: rect(0, 0, 0, 0);
  }
`;
