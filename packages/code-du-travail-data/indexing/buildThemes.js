import { getRouteBySource } from "@socialgouv/cdtn-sources";

function buildThemes(themes, getBreadcrumbs) {
  return themes.map(
    ({
      cdtnId,
      id,
      slug,
      source,
      title,
      document: { icon, description },
      contentRelations,
      parentRelations,
    }) => {
      const breadcrumbs = getBreadcrumbs(cdtnId);
      breadcrumbs.pop();
      return {
        breadcrumbs,
        cdtnId,
        children: themes
          .filter(
            ({ parentRelations }) => parentRelations[0].parentThemeId === cdtnId
          )
          .sort(
            (
              { parentRelations: [{ position: positionA }] },
              { parentRelations: [{ position: positionB }] }
            ) => positionA - positionB
          )
          .map(({ slug, title }) => ({
            label: title,
            slug,
          })),
        description,
        icon,
        id,
        isPublished: true,
        position: parentRelations[0].position,
        refs: contentRelations
          .sort(
            ({ position: positionA }, { position: positionB }) =>
              positionA - positionB
          )
          .map(({ content: { slug, source, title } }) => ({
            title,
            url: `/${getRouteBySource(source)}/${slug}`,
          })),
        slug,
        source,
        title,
      };
    }
  );
}

export { buildThemes };
