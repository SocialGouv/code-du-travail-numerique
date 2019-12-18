import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import { icons, theme } from "@socialgouv/react-ui";

import { AccessibilityModal } from "../../common/AccessibilityModal";
import { BurgerStyles } from "./BurgerStyles";

const { Burger: BurgerIcon, Close: CloseIcon } = icons;

const TabIndexedLink = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <LinkItem {...props}>{children}</LinkItem>
  </Link>
);

export const BurgerNav = ({ currentPage }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.innerWidth > theme.breakpoints.intTablet) {
      // make sure the nav is focusable
      setIsDesktop(true);
    }
  }, []);
  return (
    <BurgerWrapper>
      <BurgerStyles />
      <Menu
        isOpen={isDesktop ? true : false}
        disableAutoFocus={isDesktop ? true : false}
        customBurgerIcon={<BurgerIcon />}
        customCrossIcon={<CloseIcon />}
      >
        <AccessibilityModal>
          {openModal => (
            <BaseNavItem onClick={openModal}>Accessibilité</BaseNavItem>
          )}
        </AccessibilityModal>
        {currentPage !== "tools" ? (
          <TabIndexedLink href="/outils" passHref>
            Boîte à outils
          </TabIndexedLink>
        ) : (
          <CurrentPageItem>Boîte à outils</CurrentPageItem>
        )}
        {currentPage !== "themes" ? (
          <TabIndexedLink href="/themes" passHref>
            Thèmes
          </TabIndexedLink>
        ) : (
          <CurrentPageItem>Thèmes</CurrentPageItem>
        )}
      </Menu>
    </BurgerWrapper>
  );
};

const { box, breakpoints, fonts, spacings } = theme;

const BaseNavItem = styled.button`
  position: relative;
  display: flex !important;
  align-items: center;
  height: 100%;
  padding: 0 ${spacings.base};
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    width: 100%;
    height: 5.4rem;
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
  }
`;

const LinkItem = styled(BaseNavItem).attrs(() => ({ as: "a" }))`
  text-decoration: none;
`;

const CurrentPageItem = styled(BaseNavItem).attrs(() => ({ as: "span" }))`
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

const BurgerWrapper = styled.div`
  order: 2;
  height: 100%;
  & > div {
    height: 100%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }
`;
