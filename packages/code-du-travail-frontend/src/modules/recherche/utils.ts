import { getRouteBySource, routeBySource } from "@socialgouv/cdtn-utils";

export const generateSearchLink = (
  source: keyof typeof routeBySource,
  slug: string,
  query?: string,
  url?: string
): string => {
  if (source === "external" && url) {
    return url;
  }
  return `/${getRouteBySource(source)}/${slug}${
    query ? `?q=${encodeURIComponent(query)}` : ""
  }`;
};
