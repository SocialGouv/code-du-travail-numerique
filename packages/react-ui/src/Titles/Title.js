import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Stripe } from "../Stripe";
import { breakpoints, fonts, spacings } from "../theme";

import { Header } from "./common/Header";
import { TitleParagraph } from "./common/TitleParagraph";

export const Title = ({
  as,
  children,
  topStripped = false,
  shift = "",
  subtitle,
  ...props
}) => (
  <Header leftStripped={!topStripped} shift={shift} {...props}>
    <StyledTitle leftStripped={!topStripped} as={as} shift={shift}>
      <Stripe
        rounded
        {...(!topStripped && { position: "left", length: "100%" })}
      />
      {children}
    </StyledTitle>
    {subtitle && (
      <TitleParagraph leftStripped={!topStripped} shift={shift}>
        {subtitle}
      </TitleParagraph>
    )}
  </Header>
);

Title.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  shift: PropTypes.string,
  subtitle: PropTypes.string,
  topStripped: PropTypes.bool
};

const StyledTitle = styled.h2`
  position: relative;
  margin: 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
  ${({ leftStripped, shift }) => {
    if (leftStripped) {
      return css`
        padding-left: ${shift ? shift : spacings.large};
        text-align: left;
        @media (max-width: ${breakpoints.mobile}) {
          padding-left: ${spacings.base};
        }
      `;
    }
    return css`
      padding-top: ${spacings.base};
      text-align: center;
    `;
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;
