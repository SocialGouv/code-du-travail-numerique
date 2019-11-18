import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { animations, box, fonts, spacings } from "../theme";
import styled from "styled-components";

const StyledTile = styled.a`
  position: relative;
  display: inline-flex;
  flex: 1 1 100%;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-end;
  box-sizing: border-box;
  margin: 0;
  padding: ${({ size }) =>
    size === "small"
      ? `${spacings.base} ${spacings.medium}`
      : `${spacings.medium} ${spacings.xmedium}`};
  color: ${({ theme }) => theme.paragraph};
  font-weight: 600;
  font-size: ${({ size }) =>
    size === "small" ? fonts.default : fonts.sizes.headings.small};
  text-align: left;
  text-decoration: none;
  background-color: ${({ theme, variant }) =>
    variant === "dark" ? theme.bgSecondary : theme.white};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: ${animations.transitionTiming} all;
  appearance: none;
  &:hover {
    color: ${({ theme }) => theme.paragraph};
    border-color: ${({ theme }) => theme.paragraph};
    box-shadow: ${box.shadow.default};
  }
`;

const OverflowWrapper = styled.div`
  display: block;
  max-width: 100%; /* ie11 fix :'( */
  padding-right: ${({ paddingRight }) => (paddingRight ? spacings.base : 0)};
  overflow-y: auto;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: ${spacings.tiny};
  right: ${spacings.tiny};
`;

const ButtonWrapper = styled.div`
  margin-top: ${({ size }) =>
    size === "small" ? spacings.base : spacings.medium};
`;

export const Tile = React.forwardRef(
  ({ button, children, icon: Icon, size, ...props }, ref) => (
    <StyledTile
      as={props.href ? "a" : "button"}
      size={size}
      ref={ref}
      {...props}
    >
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <OverflowWrapper paddingRight={Boolean(Icon)}>{children}</OverflowWrapper>
      {button && (
        <ButtonWrapper size={size}>
          <Button as="div" small={size === "small"} variant="secondary">
            {button}
          </Button>
        </ButtonWrapper>
      )}
    </StyledTile>
  )
);

Tile.displayName = "Tile";

Tile.propTypes = {
  button: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  size: PropTypes.string,
  variant: PropTypes.string
};

Tile.defaultProps = {
  href: "",
  button: "",
  size: "",
  variant: ""
};
