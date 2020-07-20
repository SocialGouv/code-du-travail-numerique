import slugify from "@socialgouv/cdtn-slugify";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

export function toSlug(label, position) {
  return `${position}-${slugify(label)}`;
}

export function toBreadcrumbs({ label, position }) {
  return {
    label: label,
    slug: `/${getRouteBySource(SOURCES.THEMES)}/${toSlug(label, position)}`,
  };
}

export function createThemer(themes) {
  return function getTheme(slug) {
    // we only pick the most important theme
    const theme = themes
      .filter((theme) =>
        theme.refs.find((ref) => ref.url.match(new RegExp(slug, "i")))
      )
      .sort((previous, next) => {
        // currently position also take depth into account
        // e.g. 7 has a depth of one and 71 a depth of 2 and so on
        return previous.position - next.position;
      })[0];
    let breadcrumbs = [];
    if (theme) {
      breadcrumbs = (theme.breadcrumbs || []).map(toBreadcrumbs).concat([
        {
          label: theme.title,
          slug: `/${getRouteBySource(SOURCES.THEMES)}/${toSlug(
            theme.title,
            theme.position
          )}`,
        },
      ]);
    }
    return breadcrumbs;
  };
}
