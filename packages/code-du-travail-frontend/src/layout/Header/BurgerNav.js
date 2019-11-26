import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import { icons, theme } from "@socialgouv/react-ui";
import { BurgerStyles } from "./BurgerStyles";

const { Burger: BurgerIcon, Close: CloseIcon } = icons;

const TabIndexedLink = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <StyledLink {...props}>{children}</StyledLink>
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
        {currentPage !== "tools" && (
          <TabIndexedLink href="/outils" passHref>
            Boîte à outils
          </TabIndexedLink>
        )}
        {currentPage !== "themes" && (
          <TabIndexedLink href="/themes" passHref>
            Thèmes
          </TabIndexedLink>
        )}
        {currentPage !== "about" && (
          <TabIndexedLink href="/a-propos" passHref>
            À propos
          </TabIndexedLink>
        )}
      </Menu>
    </BurgerWrapper>
  );
};

const { breakpoints, fonts, spacings } = theme;

const StyledLink = styled.a`
  display: flex !important;
  align-items: center;
  height: 100%;
  padding: 0 ${spacings.base};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  text-decoration: none;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;
    height: 5.4rem;
    font-weight: 600;
    font-size: ${fonts.sizes.headings.small};
  }
`;

const BurgerWrapper = styled.div`
  height: 100%;
  & > div {
    height: 100%;
  }
  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }
`;
