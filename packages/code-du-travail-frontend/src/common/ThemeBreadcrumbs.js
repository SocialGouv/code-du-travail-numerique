import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { icons, theme } from "@socialgouv/react-ui";

import { Breadcrumbs } from "./Breadcrumbs";

const { spacings } = theme;
const { Home: HomeIcon } = icons;

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
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

const HomeLink = (
  <Link key="home" href="/" passHref>
    <StyledLink title="Retour à l'accueil">
      <StyledHomeIcon />
      Accueil
    </StyledLink>
  </Link>
);

export const ThemeBreadcrumbs = ({ theme, breadcrumbs = [] }) => {
  const crumbs = [];
  if (theme) {
    crumbs.push(...(theme.breadcrumbs || []));
  } else {
    crumbs.push(...(breadcrumbs || []));
  }
  const themesCrumbs = [HomeLink].concat(
    crumbs.map(({ slug, title }) => (
      <Link key={slug} href="/themes/[slug]" as={`/themes/${slug}`} passHref>
        <StyledLink title={`Voir le theme ${title}`}>{title}</StyledLink>
      </Link>
    ))
  );

  if (theme && theme.title && theme.slug) {
    themesCrumbs.push(
      <span title={`voir le contenu du thème ${theme.title}`}>
        {theme.title}
      </span>
    );
  }

  // only root
  if (themesCrumbs.length === 1) {
    return null;
  }

  return <Breadcrumbs items={themesCrumbs} />;
};
