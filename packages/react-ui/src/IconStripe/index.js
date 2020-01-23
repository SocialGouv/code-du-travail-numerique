import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { breakpoints, spacings } from "../theme";

export const IconStripe = ({ children, icon: Icon, ...props }) => (
  <FlexDiv {...props}>
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </FlexDiv>
);

const FlexDiv = styled.div`
  display: flex;
  justify-content: stretch;
`;

const IconWrapper = styled.div`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  flex-shrink: 0;
  width: 4.2rem;
  height: 4.2rem;
  margin-right: ${spacings.xmedium};
  @media (max-width: ${breakpoints.mobile}) {
    width: 3.4rem;
    margin-right: ${spacings.small};
  }
`;

const ChildrenWrapper = styled.div`
  flex: 1 1 auto;
`;

IconStripe.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType.isRequired
};
