import { Container, icons, OverflowWrapper, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Breadcrumb } from "../../../code-du-travail-utils/build";

const { ArrowRight, Home: HomeIcon } = icons;

type Props = {
  items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: Props): JSX.Element {
  if (!items || items.length === 0) {
    return <></>;
  }
  return (
    <Nav aria-label="Fil d'ariane">
      <OverflowWrapper>
        <StyledContainer as="ol">
          {[
            <NavItem key="home" as="li">
              <Link href="/" passHref legacyBehavior>
                <StyledLink title="Retour à l'accueil">
                  <StyledHomeIcon />
                  Accueil
                </StyledLink>
              </Link>
            </NavItem>,
            ...items.map(({ label, slug }) => (
              <NavItem key={`${slug}`} as="li">
                <StyledArrowRight />{" "}
                <Link key={slug} href={slug} passHref legacyBehavior>
                  <StyledLink>{label}</StyledLink>
                </Link>
              </NavItem>
            )),
          ]}
        </StyledContainer>
      </OverflowWrapper>
    </Nav>
  );
}

const { breakpoints, fonts, spacings } = theme;

const Nav = styled.nav`
  margin-bottom: ${spacings.small};
  @media print {
    display: none;
  }
`;
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${spacings.small} 0 0;
  white-space: nowrap;

  &:first-of-type {
    padding-left: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.tiny};
    &:not(:last-of-type) {
      display: none;
    }
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:focus,
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;

const StyledHomeIcon = styled(HomeIcon)`
  width: 2rem;
  height: 2rem;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

const StyledArrowRight = styled(ArrowRight)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.mobile}) {
    transform: rotate(180deg);
  }
`;
