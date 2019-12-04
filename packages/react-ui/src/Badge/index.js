import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Config } from "../icons";
import { box } from "../theme";

export const Badge = ({ icon: Icon, ...props }) => (
  <StyledBadge {...props}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
  </StyledBadge>
);

Badge.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  icon: PropTypes.elementType
};

Badge.defaultProps = {
  variant: "primary",
  icon: Config
};

const DIMENSION = "5rem";

const StyledBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${DIMENSION};
  height: ${DIMENSION};
  overflow: hidden;
  color: ${({ variant, theme }) => theme[variant + "Text"]};
  border-radius: 0 ${box.borderRadius} 0 0;
  &:before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent ${({ variant, theme }) => theme[variant]}
      transparent transparent;
    border-style: solid;
    border-width: 0 ${DIMENSION} ${DIMENSION} 0;
    content: "";
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
`;
