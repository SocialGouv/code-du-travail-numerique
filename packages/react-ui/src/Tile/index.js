import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { animations, box, fonts, spacing } from "../theme";
import styled from "styled-components";

const StyledTile = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 0;
  padding: ${spacing.medium} ${spacing.xmedium};
  height: 100%;
  font-size: ${fonts.sizeH5};
  font-weight: bold;
  color: ${({ theme }) => theme.blueDark};
  text-decoration: none;
  text-align: left;
  background-color: ${({ theme }) => theme.white};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  cursor: pointer;
  appearance: none;
  transition: ${animations.transitionTiming} all;
  &:hover {
    border-color: ${({ theme }) => theme.blueDark};
    box-shadow: ${box.shadow};
  }
`;

const OverflowWrapper = styled.div`
  overflow-y: scroll;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: ${spacing.xsmall};
  right: ${spacing.xsmall};
`;

const ButtonWrapper = styled.div`
  margin-top: ${spacing.medium};
`;

export const Tile = React.forwardRef(
  ({ button, children, icon: Icon, ...props }, ref) => (
    <StyledTile as={props.href ? "a" : "button"} ref={ref} {...props}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <OverflowWrapper>{children}</OverflowWrapper>
      {button && (
        <ButtonWrapper>
          <Button noButton>{button}</Button>
        </ButtonWrapper>
      )}
    </StyledTile>
  )
);

Tile.displayName = "Tile";

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
  href: PropTypes.string,
  title: PropTypes.string,
  button: PropTypes.string
};

Tile.defaultProps = {
  href: "",
  button: ""
};
