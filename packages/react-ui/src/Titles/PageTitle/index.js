import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme";
import { Header } from "../common/Header";
import { TitleParagraph } from "../common/TitleParagraph";

export const PageTitle = ({
  as,
  children,
  leftStripped = false,
  shift = "",
  subtitle,
  variant,
  ...props
}) => (
  <Header pageTitle leftStripped={leftStripped} shift={shift} {...props}>
    <StyledPageTitle leftStripped={leftStripped} as={as} shift={shift}>
      <Stripe
        rounded={variant !== "primary"}
        variant={variant}
        {...(leftStripped && { position: "left", length: "100%" })}
      />
      {children}
    </StyledPageTitle>
    {subtitle && (
      <TitleParagraph leftStripped={leftStripped} shift={shift}>
        {subtitle}
      </TitleParagraph>
    )}
  </Header>
);

PageTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  shift: PropTypes.string,
  leftStripped: PropTypes.bool,
  subtitle: PropTypes.string,
  variant: PropTypes.string
};

PageTitle.defaultProps = {
  variant: "secondary"
};

const StyledPageTitle = styled.h1`
  position: relative;
  margin: 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.large};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
  ${({ leftStripped, shift }) => {
    if (leftStripped) {
      return css`
        padding-left: ${shift ? shift : spacings.large};
        @media (max-width: ${breakpoints.mobile}) {
          padding-left: ${spacings.base};
        }
      `;
    }
    return css`
      padding-top: ${spacings.base};
    `;
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.mobileMedium};
  }
`;
