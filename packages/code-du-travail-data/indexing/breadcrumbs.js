import { getRouteBySource, SOURCES } from "@cdt/sources";

export function createThemer(themes) {
  return function getTheme(slug) {
    const theme = themes.find((theme) =>
      theme.refs.some((ref) => ref.url.match(new RegExp(slug)))
    );
    let breadcrumbs = [];
    if (theme) {
      breadcrumbs = (theme.breadcrumbs || []).concat([
        {
          label: theme.title,
          slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`,
        },
      ]);
    }
    return breadcrumbs;
  };
}
