"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { JsonLd } from "./JsonLd";
import {
  buildContentThemeJsonLd,
  buildFaqPageJsonLd,
  buildGraphJsonLd,
  JSON_LD_IDS,
} from "./builders";

export function ArticleJsonLd({
  title,
  datePublished,
  breadcrumbs,
  disambiguatingDescription,
  faq,
}: {
  title: string;
  datePublished?: string;
  breadcrumbs: BreadcrumbType[];
  disambiguatingDescription?: string;
  // Fourni, l'Article et une FAQPage mono-question sont émis dans un `@graph`.
  faq?: { question: string; answer: string };
}) {
  const pathname = usePathname() || "/";

  // Même sélection que ThemeTags : thème racine + sous-thème le plus profond.
  const rootTheme = breadcrumbs[0];
  const subTheme = breadcrumbs[breadcrumbs.length - 1];
  if (!rootTheme || !subTheme) return null;

  const themes =
    rootTheme.slug === subTheme.slug ? [rootTheme] : [rootTheme, subTheme];

  const article = buildContentThemeJsonLd({
    name: title,
    url: pathname,
    datePublished,
    themes: themes.map(({ label, slug }) => ({ label, slug })),
    disambiguatingDescription,
  });

  return (
    <JsonLd
      id={JSON_LD_IDS.article}
      data={
        faq
          ? buildGraphJsonLd([
              article,
              buildFaqPageJsonLd({ ...faq, url: pathname }),
            ])
          : article
      }
    />
  );
}
