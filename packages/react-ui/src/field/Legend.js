import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const Legend = ({ isHidden, ...props }) => {
  return <StyledLegend {...props} isHidden={isHidden} />;
};

Legend.propTypes = {
  children: PropTypes.node.isRequired,
  isHidden: PropTypes.bool,
};

Legend.defaultProps = {
  isHidden: false,
};

export const StyledLegend = styled.legend`
  padding: 0;
  margin: 0;
  border: 0;
  ${({ isHidden }) => isHidden && `display: none`};
`;
