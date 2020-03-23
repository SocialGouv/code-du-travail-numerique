import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { breakpoints, spacings } from "../theme";

const SIZE = "4.2rem";
const SMALL_SIZE = "3.4rem";

export const IconStripe = ({ children, icon: Icon, small, ...props }) => (
  <FlexDiv {...props}>
    <IconWrapper small={small}>
      <Icon />
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
  width: ${({ small }) => (small ? SMALL_SIZE : SIZE)};
  height: ${({ small }) => (small ? SMALL_SIZE : SIZE)};
  margin-right: ${spacings.xmedium};
  @media (max-width: ${breakpoints.mobile}) {
    width: ${SMALL_SIZE};
    height: ${SMALL_SIZE};
    margin-right: ${spacings.small};
  }
  svg {
    width: ${({ small }) => (small ? SMALL_SIZE : SIZE)};
    height: ${({ small }) => (small ? SMALL_SIZE : SIZE)};
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
