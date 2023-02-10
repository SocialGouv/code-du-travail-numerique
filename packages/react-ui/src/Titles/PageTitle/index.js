import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme.js";
import { Header } from "../common/Header.js";
import { TitleParagraph } from "../common/TitleParagraph.js";

export const PageTitle = (props) => (
  <Header pageTitle stripe={props.stripe} shift={props.shift} {...props}>
    <StyledPageTitle stripe={props.stripe} as={props.as} shift={props.shift}>
      <Stripe
        rounded={props.variant !== "primary"}
        variant={props.variant}
        {...(props.stripe === "left" && { length: "100%", position: "left" })}
      />
      {props.children}
    </StyledPageTitle>
    {props.subtitle && (
      <TitleParagraph stripe={props.stripe} shift={props.shift}>
        {props.subtitle}
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
