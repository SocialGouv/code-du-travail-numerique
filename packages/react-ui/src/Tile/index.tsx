import React from "react";
import styled from "styled-components";

import { Badge } from "../Badge";
import { Stripe } from "../Stripe";
import { box, breakpoints, fonts, spacings } from "../theme";
import { Heading } from "../Titles/Heading";
import { Subtitle } from "../Titles/Subtitle";

export type TileProps = {
  centerTitle?: Boolean;
  custom?: Boolean;
  href?: string;
  icon?: React.ElementType;
  rel?: string;
  striped?: Boolean;
  subtitle?: string;
  target?: string;
  title?: string;
  titleTagType?: React.ElementType;
  wide?: Boolean;
  disabled?: Boolean;
};

export const Tile = React.forwardRef(
  (
    {
      children,
      custom = false,
      icon: Icon,
      striped = false,
      subtitle = "",
      title = "",
      href,
      wide = false,
      titleTagType = "p",
      centerTitle = false,
      target,
      rel,
      disabled = false,
      ...props
    }: React.PropsWithChildren<TileProps>,
    ref: React.ForwardedRef<any>
  ) => {
    return (
      <StyledTile ref={ref} wide={wide} disabled={disabled} {...props}>
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
              <StyledSubtitle>
                {!disabled && href && !title ? (
                  <a href={href} target={target} rel={rel}>
                    {subtitle}
                  </a>
                ) : (
                  subtitle
                )}
              </StyledSubtitle>
            )}
            {title && (
              <StyledHeading as={titleTagType}>
                {!disabled && href ? (
                  <a href={href} target={target} rel={rel}>
                    {title}
                  </a>
                ) : (
                  title
                )}
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

type StyledTileProps = {
  wide: Boolean;
  disabled: Boolean;
};

const StyledTile = styled.div<StyledTileProps>`
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
  color: ${({ disabled, theme }) =>
    disabled ? theme.placeholder : theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  text-align: ${({ wide }) => (wide ? "left" : "center")};
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  transition: ${({ disabled }) =>
    disabled
      ? "none"
      : "box-shadow ${animations.transitionTiming} linear, transform 100ms linear"};
  appearance: none;

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${({ wide }) =>
      wide
        ? `${spacings.base} ${spacings.base}`
        : `${spacings.medium} ${spacings.base}`};
    font-size: ${fonts.sizes.small};
  }

  ${({ disabled, theme }) =>
    !disabled &&
    `&:hover,
  &:active,
  &:focus {
    color: ${theme.paragraph};
    box-shadow: ${box.shadow.large(theme.secondary)};
    transform: translateY(-2px);
  }`}
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

type HeadingWrapperProps = {
  custom: Boolean;
  centerTitle: Boolean;
};
const HeadingWrapper = styled.div<HeadingWrapperProps>`
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
  &:last-child {
    margin-bottom: 0;
  }
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
