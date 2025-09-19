import { getRouteBySource, routeBySource } from "@socialgouv/cdtn-utils";

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
