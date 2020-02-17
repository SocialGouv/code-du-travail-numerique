import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Container, icons, OverflowWrapper, theme } from "@socialgouv/react-ui";

const { ArrowRight, Home: HomeIcon } = icons;

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Nav>
      <OverflowWrapper>
        <StyledContainer>
          {[
            <NavItem key="home">
              <Link href="/" passHref>
                <StyledLink title="Retour à l'accueil">
                  <StyledHomeIcon />
                  Accueil
                </StyledLink>
              </Link>
            </NavItem>,
            ...items.map(({ label, path, slug }) =>
              path ? (
                <NavItem key={slug}>
                  <StyledArrowRight />{" "}
                  <Link
                    key={`${path}${slug}`}
                    href={`/${path}${slug ? "/[slug]" : ""}`}
                    {...(slug && { as: `/${path}/${slug}` })}
                    passHref
                  >
                    <StyledLink>{label}</StyledLink>
                  </Link>
                </NavItem>
              ) : (
                <StyledSpan key={slug}>
                  <StyledArrowRight /> {label}
                </StyledSpan>
              )
            )
          ]}
        </StyledContainer>
      </OverflowWrapper>
    </Nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node)
};

export { Breadcrumbs };

const { breakpoints, fonts, spacings } = theme;

const Nav = styled.nav`
  margin-bottom: ${spacings.small};
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

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  padding: 0 ${spacings.small} 0 0;
  white-space: nowrap;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
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
