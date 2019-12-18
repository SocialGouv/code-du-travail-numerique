import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Badge } from "../Badge";
import { Subtitle, Heading } from "../Titles";
import { animations, box, breakpoints, fonts, spacings } from "../theme";

export const Tile = React.forwardRef(
  ({ children, custom, icon: Icon, subtitle, title, wide, ...props }, ref) => (
    <StyledTile
      as={props.href ? "a" : "button"}
      ref={ref}
      wide={wide}
      {...props}
    >
      {custom && <Badge />}
      <div>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <HeadingWrapper custom>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {title && <StyledHeading>{title}</StyledHeading>}
        </HeadingWrapper>
      </div>
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
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  wide: PropTypes.bool
};

Tile.defaultProps = {
  custom: false,
  href: undefined,
  icon: null,
  subtitle: "",
  wide: false
};

const StyledTile = styled.a`
  position: relative;
  display: inline-flex;
  flex: 1 1 100%;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  width: ${({ wide }) => (wide ? "100%" : "auto")};
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
  width: 7.2rem;
  height: 7.2rem;
  margin: 0 auto ${spacings.base};
  padding: 1.4rem;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 50%;
`;

const HeadingWrapper = styled.div`
  padding-right: ${({ custom }) => (custom ? spacings.small : "0")};
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const ChildrenWrapper = styled.div`
  margin-top: ${spacings.small};
`;
