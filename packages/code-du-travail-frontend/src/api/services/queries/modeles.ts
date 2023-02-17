export function getModeles() {
  return {
    _source: [
      "title",
      "slug",
      "description",
      "source",
      "breadcrumbs",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: "modeles_de_courriers" } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1000,
  };
}

export function getModeleBySlug(slug: string) {
  return {
    _source: [
      "title",
      "slug",
      "description",
      "source",
      "breadcrumbs",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: "modeles_de_courriers" } },
          { term: { isPublished: true } },
          { term: { slug } },
        ],
      },
    },
    size: 1,
  };
}
