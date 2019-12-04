import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Stripe } from "../Stripe";
import { breakpoints, fonts, spacings } from "../theme";

export const PageTitle = ({
  as,
  children,
  leftStripped = false,
  subtitle,
  ...props
}) => (
  <Header leftStripped={leftStripped} {...props}>
    <StyledPageTitle leftStripped={leftStripped} as={as}>
      <Stripe
        rounded
        {...(leftStripped && { position: "left", length: "100%" })}
      />
      {children}
    </StyledPageTitle>
    {subtitle && <P leftStripped={leftStripped}>{subtitle}</P>}
  </Header>
);

PageTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
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
  ${({ leftStripped }) => {
    if (leftStripped) {
      return css`
        padding-left: ${spacings.large};
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
  subtitle,
  ...props
}) => (
  <Header leftStripped={!topStripped} {...props}>
    <StyledTitle leftStripped={!topStripped} as={as}>
      <Stripe
        rounded
        {...(!topStripped && { position: "left", length: "100%" })}
      />
      {children}
    </StyledTitle>
    {subtitle && <P leftStripped={!topStripped}>{subtitle}</P>}
  </Header>
);

Title.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
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
  ${({ leftStripped }) => {
    if (leftStripped) {
      return css`
        padding-left: ${spacings.large};
        text-align: left;
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
  ${({ leftStripped }) => {
    if (leftStripped) {
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
  padding-left: ${({ leftStripped }) => (leftStripped ? spacings.large : "0")};
`;
