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

  // Contrat : breadcrumbs est fourni dans l'ordre racine → sous-thème le plus
  // profond, comme le fil d'Ariane DSFR et le JSON-LD qui le consomment aussi
  // dans l'ordre du tableau (cf. ContainerWithBreadcrumbs, ArticleJsonLd).
  // NB : le champ `position` est l'ordre d'un thème parmi ses frères, pas sa
  // profondeur — on ne peut donc pas trier dessus pour retrouver la hiérarchie.
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

  // Un seul niveau de thème → un seul tag ; sinon racine + sous-thème.
  const tags: TagsGroupProps["tags"] =
    breadcrumbs.length === 1
      ? [themeToTag(rootTheme)]
      : [themeToTag(rootTheme), themeToTag(subTheme)];

  // L'espacement est piloté par le composant parent (ContentMeta) pour un rythme
  // homogène titre → date → tags sur toutes les pages de contenu.
  return <TagsGroup tags={tags} />;
};
