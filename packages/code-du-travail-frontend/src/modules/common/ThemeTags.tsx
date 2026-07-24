"use client";
import React from "react";
import TagsGroup, { TagsGroupProps } from "@codegouvfr/react-dsfr/TagsGroup";
import { TagProps } from "@codegouvfr/react-dsfr/Tag";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { useCommonTracking } from "./tracking";
import { getThemeTagShortTitle } from "./themeTagShortTitles";

type Props = {
  breadcrumbs: BreadcrumbType[];
};

export const ThemeTags = ({ breadcrumbs }: Props) => {
  const { emitClickThemeTag } = useCommonTracking();

  // breadcrumbs est ordonné du thème racine au sous-thème le plus profond
  const rootTheme = breadcrumbs[0];
  const subTheme = breadcrumbs[breadcrumbs.length - 1];
  if (!rootTheme || !subTheme) return null;

  const themeToTag = (theme: BreadcrumbType): TagProps => ({
    children: getThemeTagShortTitle(theme.label),
    linkProps: {
      href: theme.slug,
      onClick: () => emitClickThemeTag(theme.slug),
    },
  });

  const tags: TagsGroupProps["tags"] =
    rootTheme.slug === subTheme.slug
      ? [themeToTag(rootTheme)]
      : [themeToTag(rootTheme), themeToTag(subTheme)];

  // L'espacement est piloté par le composant parent (ContentMeta) pour un rythme
  // homogène titre → date → tags sur toutes les pages de contenu.
  return <TagsGroup tags={tags} />;
};
