import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

function toBreadcrumbs({ theme, position }) {
  return {
    label: theme.title,
    position,
    slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`,
  };
}

export function buildGetBreadcrumbs(themeRelations) {
  /* utilities */

  // beware, this one is recursive
  // we might want to set a depth limit for safety reasons
  // it picks a relation and returns an array of all possible breadcrumbs
  function buildAllBreadcrumbs(relation) {
    const currentBreadcrumb = toBreadcrumbs(relation);
    const parentRelations = themeRelations.filter(
      (themeRelation) => themeRelation.theme.cdtnId === relation.parentId
    );
    if (!parentRelations.length) {
      return [[currentBreadcrumb]];
    }
    return parentRelations.flatMap(buildAllBreadcrumbs).map((breadcrumbs) => {
      breadcrumbs.push(currentBreadcrumb);
      return breadcrumbs;
    });
  }

  const themeToBreadcrumbsMap = new Map(
    themeRelations.map((relation) => [
      relation.theme.cdtnId,
      buildAllBreadcrumbs(relation),
    ])
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

  /* end of utilities */

  return function getBreadcrumbs(cdtnId) {
    if (!cdtnId) return [];
    const relatedRelations = themeRelations.filter(
      (themeRelation) =>
        themeRelation.theme.contentRelations.find(
          (contentRelation) => contentRelation.document.cdtnId === cdtnId
        ) || themeRelation.theme.cdtnId === cdtnId
    );
    const allBreadcrumbs = relatedRelations.flatMap(({ theme }) =>
      themeToBreadcrumbsMap.get(theme.cdtnId)
    );
    return getMainBreadcrumb(allBreadcrumbs);
  };
}
