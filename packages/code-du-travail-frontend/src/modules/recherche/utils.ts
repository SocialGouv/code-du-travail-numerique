import {
  getLabelBySource,
  getRouteBySource,
  routeBySource,
  slugify,
} from "@socialgouv/cdtn-utils";
import { SearchResult } from "../../api";
import { css } from "@styled-system/css";
import { JSX } from "react";
import { fr } from "@codegouvfr/react-dsfr";

export const generateSearchLink = (
  source: keyof typeof routeBySource,
  slug: string,
  url?: string,
  parentSlug?: string
): string => {
  if (source === "external" && url) {
    return url;
  }
  if (source === "themes" && parentSlug) {
    return `/themes/${parentSlug}#${slugify(slug)}`;
  }
  return `/${getRouteBySource(source)}/${slug}`;
};

export const getSourceLabel = (source: keyof typeof routeBySource): string => {
  const ficheGeneriqueSourceTypes = [
    "fiches_ministere_travail",
    "fiches_service_public",
    "page_fiche_ministere_travail",
    "information",
  ];

  if (ficheGeneriqueSourceTypes.includes(source)) {
    return "FICHE GÉNÉRIQUE";
  }

  if (source === "contributions") {
    return "RÉPONSE SUR-MESURE";
  }

  return String(getLabelBySource(source)).toUpperCase();
};

export const badgeColorClasses: Partial<
  Record<SearchResult["source"], string>
> = {
  themes: css({
    backgroundColor: "var(--background-contrast-info) !important", // light decision background background contrast info
    color: "var(--text-default-info) !important", // light decision text default info
  }),
  code_du_travail: css({
    backgroundColor: "var(--background-alt-yellow-tournesol) !important", // light option illustration color 950 default yellow tournesol
    color: "var(--text-action-high-yellow-tournesol) !important", // light option illustration color sun default yellow tournesol
  }),
  conventions_collectives: css({
    backgroundColor: "var(--background-contrast-success) !important", // light decision background background contrast success
    color: "var(--text-default-success) !important", // light decision text default success
  }),
  modeles_de_courriers: css({
    backgroundColor: "var(--background-alt-purple-glycine) !important", // light option illustration color 950 default purple glycine
    color: "var(--text-action-high-purple-glycine) !important", // light option illustration color sun default purple glycine
  }),
  outils: css({
    backgroundColor: "var(--background-contrast-warning) !important", // light decision background background contrast warning
    color: "var(--text-default-warning) !important", // light decision text default warning
  }),
  external: css({
    backgroundColor: "var(--background-contrast-warning) !important", // light decision background background contrast warning
    color: "var(--text-default-warning) !important", // light decision text default warning
  }),
  infographies: css({
    backgroundColor: "var(--background-alt-brown-cafe-creme) !important", // light option illustration color 975 default brown cafe creme
    color: "var(--text-action-high-brown-cafe-creme) !important", // light option illustration color sun default purple glycine
  }),
  contributions: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
  fiches_ministere_travail: css({
    backgroundColor: "var(--background-alt-green-emeraude) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-emeraude) !important", // light option illustration color sun default green archipel
  }),
  fiches_service_public: css({
    backgroundColor: "var(--background-alt-green-emeraude) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-emeraude) !important", // light option illustration color sun default green archipel
  }),
  information: css({
    backgroundColor: "var(--background-alt-green-emeraude) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-emeraude) !important", // light option illustration color sun default green archipel
  }),
  page_fiche_ministere_travail: css({
    backgroundColor: "var(--background-alt-green-emeraude) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
};
