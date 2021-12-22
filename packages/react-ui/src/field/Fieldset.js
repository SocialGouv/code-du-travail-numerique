import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

export const Fieldset = ({ children, ...props }) => {
  return <StyledFieldset {...props}> {children}</StyledFieldset>;
};

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
};

export const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;
