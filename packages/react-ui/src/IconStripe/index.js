import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { breakpoints, spacings } from "../theme";

export const IconStripe = ({ children, icon: Icon, small, ...props }) => (
  <FlexDiv {...props}>
    <IconWrapper small={small}>
      <Icon width="auto" height="auto" />
    </IconWrapper>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </FlexDiv>
);

const FlexDiv = styled.div`
  display: flex;
  ${({ centered }) => centered && "align-items: center;"}
  justify-content: stretch;
`;

const IconWrapper = styled.div`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  flex-shrink: 0;
  width: ${({ small }) => (small ? "3.4rem" : "4.2rem")};
  height: ${({ small }) => (small ? "3.4rem" : "4.2rem")};
  margin-right: ${spacings.xmedium};
  @media (max-width: ${breakpoints.mobile}) {
    width: 3.4rem;
    height: 3.4rem;
    margin-right: ${spacings.small};
  }
`;

const ChildrenWrapper = styled.div`
  flex: 1 1 auto;
`;

IconStripe.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType.isRequired,
  small: PropTypes.bool
};
