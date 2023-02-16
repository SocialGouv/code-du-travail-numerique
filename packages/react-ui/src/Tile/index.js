import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { Badge } from "../Badge";
import { Stripe } from "../Stripe";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";
import { Heading } from "../Titles/Heading";
import { Subtitle } from "../Titles/Subtitle";

export const Tile = React.forwardRef(
  (
    {
      children,
      custom,
      icon: Icon,
      striped,
      subtitle,
      title,
      href,
      wide,
      titleTagType,
      centerTitle,
      ...props
    },
    ref
  ) => {
    return (
      <StyledTile ref={ref} wide={wide} {...props}>
        {custom && <Badge />}
        <TopWrapper>
          {striped && <Stripe length="5rem" />}
          {Icon && (
            <IconWrapper>
              <Icon />
            </IconWrapper>
          )}
          <HeadingWrapper custom centerTitle={centerTitle}>
            {subtitle && (
              <StyledSubtitle noTitle={!title}>{subtitle}</StyledSubtitle>
            )}
            {title && (
              <StyledHeading as={titleTagType}>
                {href ? <a href={href}>{title}</a> : title}
              </StyledHeading>
            )}
          </HeadingWrapper>
        </TopWrapper>
        {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
      </StyledTile>
    );
  }
);

Tile.displayName = "Tile";

Tile.propTypes = {
  centerTitle: PropTypes.bool,
  children: PropTypes.node,
  custom: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  striped: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  titleTagType: PropTypes.string,
  wide: PropTypes.bool,
};

Tile.defaultProps = {
  centerTitle: false,
  custom: false,
  href: undefined,
  icon: null,
  striped: false,
  subtitle: "",
  title: "",
  titleTagType: "p",
  wide: false,
};

const StyledTile = styled.div`
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
  margin: 0 auto ${spacings.tiny};
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 50%;
`;

const TopWrapper = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

const HeadingWrapper = styled.div`
  padding-right: ${({ custom }) => (custom ? spacings.small : "0")};
  height: ${({ centerTitle }) => (centerTitle ? "45px" : "auto")};
  display: ${({ centerTitle }) => (centerTitle ? "flex" : "block")};
  align-items: ${({ centerTitle }) => (centerTitle ? "center" : "start")};
  justify-content: ${({ centerTitle }) => (centerTitle ? "center" : "start")};
  margin: ${({ centerTitle }) => (centerTitle ? "0" : "inherit")};

  a,
  a:hover {
    text-decoration: none;
  }
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
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
`;

const ChildrenWrapper = styled.div`
  flex: 1 1 auto;
  margin-top: ${spacings.small};
`;
