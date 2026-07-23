"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { JsonLd } from "./JsonLd";
import { buildContentThemeJsonLd, JSON_LD_IDS } from "./builders";

export function ArticleJsonLd({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs: BreadcrumbType[];
}) {
  const pathname = usePathname() || "/";

  // Même sélection que ThemeTags : thème racine + sous-thème le plus profond.
  const rootTheme = breadcrumbs[0];
  const subTheme = breadcrumbs[breadcrumbs.length - 1];
  if (!rootTheme || !subTheme) return null;

  const themes =
    rootTheme.slug === subTheme.slug ? [rootTheme] : [rootTheme, subTheme];

  return (
    <JsonLd
      id={JSON_LD_IDS.article}
      data={buildContentThemeJsonLd({
        name: title,
        url: pathname,
        themes: themes.map(({ label, slug }) => ({ label, slug })),
      })}
    />
  );
}
