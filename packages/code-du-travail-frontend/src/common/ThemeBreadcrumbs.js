import React from "react";
import Link from "next/link";

import { Breadcrumbs } from "./Breadcrumbs";

const ROOT_CRUMB = {
  title: "Thèmes",
  slug: null
};

export const ThemeBreadcrumbs = ({ theme, breadcrumbs = [] }) => {
  const crumbs = [];
  if (theme) {
    crumbs.push(...(theme.breadcrumbs || []));
  } else {
    crumbs.push(...(breadcrumbs || []));
  }
  const themesCrumbs = [ROOT_CRUMB, ...crumbs].map(({ slug, title }) => (
    <Link
      key={slug}
      href={`/themes${(slug && `/[${slug}]`) || ""}`}
      as={`/themes${(slug && `/${slug}`) || ""}`}
    >
      <a title={`Voir le theme ${title}`}>{title}</a>
    </Link>
  ));

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
