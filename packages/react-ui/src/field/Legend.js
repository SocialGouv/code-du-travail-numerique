import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const Legend = ({ isInvisible, ...props }) => {
  return <StyledLegend {...props} isInvisible={isInvisible} />;
};

Legend.propTypes = {
  children: PropTypes.node.isRequired,
  isInvisible: PropTypes.bool,
};

Legend.defaultProps = {
  isInvisible: false,
};

export const StyledLegend = styled.legend`
  padding: 0;
  margin: 0;
  border: 0;
  ${({ isInvisible }) => isInvisible && `display: none`};
`;
