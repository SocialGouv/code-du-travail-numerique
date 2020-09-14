import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme";
import { Header } from "../common/Header";
import { TitleParagraph } from "../common/TitleParagraph";

export const Title = ({
  as,
  children,
  isFirst,
  shift = "",
  subtitle,
  topStripped = false,
  unstriped = false,
  variant,
  ...props
}) => (
  <Header
    isFirst={isFirst}
    leftStripped={!topStripped}
    shift={shift}
    {...props}
  >
    <StyledTitle
      unstriped={unstriped}
      leftStripped={!topStripped}
      as={as}
      shift={shift}
    >
      {!unstriped && (
        <Stripe
          rounded={variant !== "primary"}
          variant={variant}
          {...(!topStripped && { length: "100%", position: "left" })}
        />
      )}
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
  isFirst: PropTypes.bool,
  shift: PropTypes.string,
  subtitle: PropTypes.node,
  topStripped: PropTypes.bool,
  unstriped: PropTypes.bool,
  variant: PropTypes.string,
};

Title.defaultProps = {
  isFirst: false,
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
  }}
  ${({ unstriped }) => {
    if (unstriped) {
      return css`
        padding-left: 0;
      `;
    }
  }}
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;
