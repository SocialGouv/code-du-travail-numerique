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
      return {
        breadcrumbs: breadcrumbs.slice(0, -1),
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
          .map(({ content: { cdtnId, document, slug, source, title } }) => ({
            cdtnId,
            description: document.description,
            slug,
            source,
            title,
          })),
        slug,
        source,
        title,
      };
    }
  );
}

export { buildThemes };
