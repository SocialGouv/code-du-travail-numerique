import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme";

export const Heading = ({ children, striped = false, variant, ...props }) => (
  <StyledHeading striped={striped} {...props}>
    {striped && (
      <Stripe
        rounded={variant !== "primary"}
        variant={variant}
        position="left"
        length="100%"
      />
    )}
    {children}
  </StyledHeading>
);

Heading.propTypes = {
  children: PropTypes.node,
  isFirst: PropTypes.bool,
  shift: PropTypes.string,
  striped: PropTypes.bool,
  variant: PropTypes.string,
};

Heading.defaultProps = {
  isFirst: false,
  variant: "secondary",
};

const StyledHeading = styled.h3`
  position: relative;
  margin: ${({ isFirst }) => (isFirst ? 0 : spacings.large)} 0
    ${spacings.medium} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${(striped) =>
    striped ? fonts.lineHeight : fonts.lineHeightTitle};
  ${({ striped, shift }) => {
    if (striped) {
      return css`
        margin-left: ${shift ? `-${shift}` : "0"};
        padding-left: ${shift ? shift : spacings.base};
        @media (max-width: ${breakpoints.mobile}) {
          margin-left: -${spacings.small};
          padding-left: ${spacings.base};
        }
      `;
    }
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
