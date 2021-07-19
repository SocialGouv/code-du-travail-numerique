import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe/index.js";
import { breakpoints, fonts, spacings } from "../../theme.js";
import { Header } from "../common/Header.js";
import { TitleParagraph } from "../common/TitleParagraph.js";

export const PageTitle = ({
  as,
  children,
  stripe,
  shift = "",
  subtitle,
  variant,
  ...props
}) => (
  <Header pageTitle stripe={stripe} shift={shift} {...props}>
    <StyledPageTitle stripe={stripe} as={as} shift={shift}>
      <Stripe
        rounded={variant !== "primary"}
        variant={variant}
        {...(stripe === "left" && { length: "100%", position: "left" })}
      />
      {children}
    </StyledPageTitle>
    {subtitle && (
      <TitleParagraph stripe={stripe} shift={shift}>
        {subtitle}
      </TitleParagraph>
    )}
  </Header>
);

PageTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  shift: PropTypes.string,
  stripe: PropTypes.oneOf(["left", "top"]),
  subtitle: PropTypes.node,
  variant: PropTypes.string,
};

PageTitle.defaultProps = {
  stripe: "top",
  variant: "secondary",
};

const StyledPageTitle = styled.h1`
  position: relative;
  margin: 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.large};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
  ${({ stripe, shift }) => {
    if (stripe === "left") {
      return css`
        padding-left: ${shift ? shift : spacings.large};
        @media (max-width: ${breakpoints.mobile}) {
          padding-left: ${spacings.base};
        }
      `;
    } else if (stripe === "top")
      return css`
        padding-top: ${spacings.base};
      `;
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.mobileMedium};
  }
`;
