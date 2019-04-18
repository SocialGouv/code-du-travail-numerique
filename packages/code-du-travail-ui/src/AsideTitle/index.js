import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors, fonts, spacing } from "../theme";

const AsideTitle = ({ children }) => {
  return <H3>{children}</H3>;
};

AsideTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string
  ]).isRequired,
  style: PropTypes.object
};

export default AsideTitle;

const H3 = styled.h3`
  padding: ${spacing.interComponent} 0;
  font-size: ${fonts.sizeH5};
  font-weight: 600;
  color: ${colors.black};
`;
