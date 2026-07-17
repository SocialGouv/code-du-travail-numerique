"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import TagsGroup, { TagsGroupProps } from "@codegouvfr/react-dsfr/TagsGroup";
import { TagProps } from "@codegouvfr/react-dsfr/Tag";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { useCommonTracking } from "./tracking";

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
    children: theme.label,
    linkProps: {
      href: theme.slug,
      onClick: () => emitClickThemeTag(theme.slug),
    },
  });

  const tags: TagsGroupProps["tags"] =
    rootTheme.slug === subTheme.slug
      ? [themeToTag(rootTheme)]
      : [themeToTag(rootTheme), themeToTag(subTheme)];

  return <TagsGroup className={fr.cx("fr-mt-2w")} tags={tags} />;
};
