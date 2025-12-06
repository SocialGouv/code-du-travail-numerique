import {
  getRouteBySource,
  getLabelBySource,
  routeBySource,
} from "@socialgouv/cdtn-utils";

export const generateSearchLink = (
  source: keyof typeof routeBySource,
  slug: string,
  url?: string
): string => {
  if (source === "external" && url) {
    return url;
  }
  return `/${getRouteBySource(source)}/${slug}`;
};

export const getSourceLabel = (source: keyof typeof routeBySource): string => {
  const ficheSourceTypes = [
    "contributions",
    "fiches_ministere_travail",
    "fiches_service_public",
    "page_fiche_ministere_travail",
    "information",
  ];

  if (ficheSourceTypes.includes(source)) {
    return "FICHE";
  }

  return String(getLabelBySource(source));
};
