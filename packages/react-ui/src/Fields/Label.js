import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { fonts, spacings } from "../theme";

export const Label = ({ children, ...props }) => (
  <StyledLabel {...props}>{children}</StyledLabel>
);

Label.propTypes = {
  children: PropTypes.node.isRequired
};

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: ${fonts.sizes.small};
  padding-bottom: ${spacings.tiny};
  line-height: ${fonts.lineHeightLabel};
  cursor: pointer;
`;
