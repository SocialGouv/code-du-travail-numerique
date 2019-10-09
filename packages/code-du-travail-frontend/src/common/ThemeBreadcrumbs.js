import React from "react";
import Link from "next/link";

import { Breadcrumbs } from "./Breadcrumbs";

const HomeLink = (
  <Link key="home" href="/" title="Retour à l'accueil">
    <a>Accueil</a>
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
        <a title={`Voir le theme ${title}`}>{title}</a>
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

