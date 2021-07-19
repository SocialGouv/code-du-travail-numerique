import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Badge } from "../Badge";
import { Stripe } from "../Stripe/index.js";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";
import { Heading } from "../Titles/Heading/index.js";
import { Subtitle } from "../Titles/Subtitle/index.js";

export const Tile = React.forwardRef(
  (
    { children, custom, icon: Icon, striped, subtitle, title, wide, ...props },
    ref
  ) => (
    <StyledTile
      as={props.href ? "a" : "button"}
      ref={ref}
      wide={wide}
      {...props}
    >
      {custom && <Badge />}
      <TopWrapper>
        {striped && <Stripe length="5rem" />}
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <HeadingWrapper custom>
          {subtitle && (
            <StyledSubtitle noTitle={!title}>{subtitle}</StyledSubtitle>
          )}
          {title && <StyledHeading>{title}</StyledHeading>}
        </HeadingWrapper>
      </TopWrapper>
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </StyledTile>
  )
);

Tile.displayName = "Tile";

Tile.propTypes = {
  children: PropTypes.node,
  custom: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  striped: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  wide: PropTypes.bool,
};

Tile.defaultProps = {
  custom: false,
  href: undefined,
  icon: null,
  striped: false,
  subtitle: "",
  title: "",
  wide: false,
};

const StyledTile = styled.a`
  position: relative;
  display: inline-flex;
  flex: 1 1; /* adding auto here breaks IE11 on card list, beware */
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  ${({ wide }) => (wide ? "width: 100%" : "max-width: 100%")};
  margin: 0;
  padding: ${({ wide }) =>
    wide
      ? `${spacings.medium} ${spacings.medium}`
      : `${spacings.large} ${spacings.medium}`};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  text-align: ${({ wide }) => (wide ? "left" : "center")};
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  cursor: pointer;
  transition: box-shadow ${animations.transitionTiming} linear,
    transform 100ms linear;
  appearance: none;
  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.paragraph};
    box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
    transform: translateY(-2px);
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${({ wide }) =>
      wide
        ? `${spacings.base} ${spacings.base}`
        : `${spacings.medium} ${spacings.base}`};
    font-size: ${fonts.sizes.small};
  }
`;

const IconWrapper = styled.div`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  width: 7.2rem;
  height: 7.2rem;
  margin: 0 auto ${spacings.base};
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 50%;
`;

const TopWrapper = styled.div`
  flex: 0 0 auto;
`;

const HeadingWrapper = styled.div`
  padding-right: ${({ custom }) => (custom ? spacings.small : "0")};
`;

const StyledSubtitle = styled(Subtitle)`
  ${({ noTitle }) =>
    noTitle &&
    css`
      margin-bottom: 0;
    `}
`;
const StyledHeading = styled(Heading)`
  margin: 0;
`;

const ChildrenWrapper = styled.div`
  flex: 1 1 auto;
  margin-top: ${spacings.small};
`;
