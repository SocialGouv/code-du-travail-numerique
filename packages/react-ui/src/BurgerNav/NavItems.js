import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { Button } from "../Button";
import { box, breakpoints, fonts, spacings } from "../theme.js";

export const BurgerNavButton = styled(Button).attrs(() => ({
  variant: "navLink",
}))`
  position: relative;
  display: flex !important;
  align-items: center;
  height: 100%;
  padding: 0 ${spacings.medium};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  border: none;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    width: 100%;
    height: 5.4rem;
    padding: 0;
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
  }
`;

export const BurgerNavItem = ({ isCurrent, ...props }) =>
  isCurrent ? (
    <BurgerNavCurrent title="Page courante" {...props} />
  ) : (
    <BurgerNavLink {...props} />
  );
BurgerNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool,
};
const BurgerNavLink = styled(BurgerNavButton).attrs(() => ({ as: "a" }))`
  text-decoration: none;
`;

const BurgerNavCurrent = styled(BurgerNavButton).attrs(() => ({
  as: "span",
}))`
  cursor: inherit;

  &:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    height: 3px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: ${box.borderRadius};
    transform: translateX(-50%);
    content: "";
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:after {
      bottom: auto;
      left: 0;
      width: 3px;
      height: 100%;
      transform: none;
    }
  }
`;
