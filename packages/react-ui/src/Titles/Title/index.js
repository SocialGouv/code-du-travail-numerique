import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme.js";
import { Header } from "../common/Header.js";
import { TitleParagraph } from "../common/TitleParagraph.js";

export const Title = ({
  as,
  children,
  isFirst,
  shift = "",
  subtitle,
  stripe,
  variant,
  isHeader,
  ...props
}) => (
  <Header
    as={isHeader ? "header" : "div"}
    isFirst={isFirst}
    stripe={stripe}
    shift={shift}
    {...props}
  >
    <StyledTitle stripe={stripe} as={as} shift={shift}>
      {stripe !== "none" && (
        <Stripe
          rounded={variant !== "primary"}
          variant={variant}
          {...(stripe === "left" && { length: "100%", position: "left" })}
        />
      )}
      {children}
    </StyledTitle>
    {subtitle && (
      <TitleParagraph stripe={stripe} shift={shift}>
        {subtitle}
      </TitleParagraph>
    )}
  </Header>
);

Title.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  isFirst: PropTypes.bool,
  isHeader: PropTypes.bool,
  role: PropTypes.string,
  shift: PropTypes.string,
  stripe: PropTypes.oneOf(["left", "top", "none"]),
  subtitle: PropTypes.node,
  variant: PropTypes.string,
};

Title.defaultProps = {
  isFirst: false,
  isHeader: false,
  stripe: "left",
  variant: "secondary",
};

const StyledTitle = styled.h2`
  position: relative;
  margin: 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
  ${({ stripe, shift }) => {
    if (stripe === "left") {
      return css`
        padding-left: ${shift ? shift : spacings.large};
        text-align: left;
        @media (max-width: ${breakpoints.mobile}) {
          padding-left: ${spacings.base};
        }
      `;
    } else if (stripe === "top") {
      return css`
        padding-top: ${spacings.base};
        text-align: center;
      `;
    }
  }}
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;
