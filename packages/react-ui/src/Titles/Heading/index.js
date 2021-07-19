import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe/index.js";
import { breakpoints, fonts, spacings } from "../../theme.js";

export const Heading = ({ children, stripe, variant, ...props }) => (
  <StyledHeading stripe={stripe} {...props}>
    {stripe !== "none" && (
      <Stripe
        rounded={variant !== "primary"}
        variant={variant}
        position={stripe}
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
  stripe: PropTypes.oneOf(["left", "none"]),
  variant: PropTypes.string,
};

Heading.defaultProps = {
  isFirst: false,
  stripe: "none",
  variant: "secondary",
};

const StyledHeading = styled.h3`
  position: relative;
  display: block;
  margin: ${({ isFirst }) => (isFirst ? 0 : spacings.large)} 0
    ${spacings.medium} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeight};
  ${({ stripe, shift }) => {
    if (stripe === "left") {
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
