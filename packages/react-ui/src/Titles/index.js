import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Stripe } from "../Stripe";
import { breakpoints, fonts, spacings } from "../theme";

export const PageTitle = ({
  as,
  children,
  leftStripped = false,
  shift = "",
  subtitle,
  ...props
}) => (
  <Header leftStripped={leftStripped} shift={shift} {...props}>
    <StyledPageTitle leftStripped={leftStripped} as={as} shift={shift}>
      <Stripe
        rounded
        {...(leftStripped && { position: "left", length: "100%" })}
      />
      {children}
    </StyledPageTitle>
    {subtitle && (
      <P leftStripped={leftStripped} shift={shift}>
        {subtitle}
      </P>
    )}
  </Header>
);

PageTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  shift: PropTypes.string,
  leftStripped: PropTypes.bool,
  subtitle: PropTypes.string
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
`;

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
      <P leftStripped={!topStripped} shift={shift}>
        {subtitle}
      </P>
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
`;

export const Heading = styled.h3`
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
`;

export const Subtitle = styled.span`
  display: block;
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.tiny};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  text-transform: uppercase;
`;

const Header = styled.header`
  margin: 0 auto ${spacings.small};
  ${({ leftStripped, shift }) => {
    if (leftStripped) {
      if (shift) {
        return css`
          margin-left: -${shift};
          text-align: left;
          @media (max-width: ${breakpoints.mobile}) {
            margin-left: 0;
          }
        `;
      }
      return css`
        text-align: left;
      `;
    }
    return css`
      margin-bottom: ${spacings.larger};
      text-align: center;
      @media (max-width: ${breakpoints.mobile}) {
        margin-bottom: ${spacings.xmedium};
      }
    `;
  }};
`;

const P = styled.p`
  margin-top: ${spacings.small};
  margin-bottom: 0;
  padding-left: ${({ leftStripped, shift }) => {
    if (leftStripped) {
      return shift ? shift : spacings.large;
    }
    return "0";
  }};
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${({ leftStripped }) =>
      leftStripped ? spacings.large : "0"};
  }
`;
