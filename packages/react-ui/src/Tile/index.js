import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { animations, box, fonts, spacing } from "../theme";
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
      ? `${spacing.base} ${spacing.medium}`
      : `${spacing.medium} ${spacing.xmedium}`};
  color: ${({ theme }) => theme.blueDark};
  font-weight: bold;
  font-size: ${({ size }) => (size === "small" ? fonts.sizeh6 : fonts.sizeH5)};
  text-align: left;
  text-decoration: none;
  background-color: ${({ theme, variant }) =>
    variant === "dark" ? theme.lightBackground : theme.white};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: ${animations.transitionTiming} all;
  appearance: none;
  &:hover {
    border-color: ${({ theme }) => theme.blueDark};
    box-shadow: ${box.shadow};
  }
`;

const OverflowWrapper = styled.div`
  display: block;
  max-width: 100%; /* ie11 fix :'( */
  padding-right: ${({ paddingRight }) => (paddingRight ? spacing.base : 0)};
  overflow-y: auto;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: ${spacing.xsmall};
  right: ${spacing.xsmall};
`;

const ButtonWrapper = styled.div`
  margin-top: ${({ size }) =>
    size === "small" ? spacing.base : spacing.medium};
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
          <Button noButton size={size} variant="secondary">
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
