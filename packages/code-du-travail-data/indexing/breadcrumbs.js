import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

function toBreadcrumbs(theme) {
  return {
    label: theme.title,
    position: theme.parentRelations[0].position,
    slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`,
  };
}

export function buildGetBreadcrumbs(themes) {
  // beware, this one is recursive
  // we might want to set a depth limit for safety reasons
  // it picks a relation and returns an array of all possible breadcrumbs
  function buildAllBreadcrumbs(theme) {
    const currentBreadcrumb = toBreadcrumbs(theme);
    const parentTheme = themes.filter(
      (parentTheme) =>
        parentTheme.cdtnId === theme.parentRelations[0].parentThemeId
    );
    if (!parentTheme.length) {
      return [[currentBreadcrumb]];
    }
    return parentTheme.flatMap(buildAllBreadcrumbs).map((breadcrumbs) => {
      breadcrumbs.push(currentBreadcrumb);
      return breadcrumbs;
    });
  }

  const themeToBreadcrumbsMap = new Map(
    themes.map((theme) => [theme.cdtnId, buildAllBreadcrumbs(theme)])
  );

  function getMainBreadcrumb(allBreadcrumbs = []) {
    let mainBreadcrumb = allBreadcrumbs.pop();
    // we choose to pick the breadcrumb which has the lowest position
    allBreadcrumbs.forEach((breadcrumbs) => {
      let i = 0;
      while (i < mainBreadcrumb.length && i < breadcrumbs.length) {
        if (breadcrumbs[i].position > mainBreadcrumb[i].position) {
          return;
        }
        if (breadcrumbs[i].position < mainBreadcrumb[i].position) {
          mainBreadcrumb = breadcrumbs;
          return;
        }
        i++;
      }
    });
    return mainBreadcrumb || [];
  }

  return function getBreadcrumbs(cdtnId) {
    if (!cdtnId) return [];
    const relatedThemes = themes.filter(
      (theme) =>
        theme.cdtnId === cdtnId ||
        theme.contentRelations.find(
          (contentRelation) => contentRelation.content.cdtnId === cdtnId
        )
    );
    const allBreadcrumbs = relatedThemes.flatMap((theme) =>
      themeToBreadcrumbsMap.get(theme.cdtnId)
    );
    return getMainBreadcrumb(allBreadcrumbs);
  };
}
