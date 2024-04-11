export const getAllInternalToolsQuery = () => {
  return {
    _source: ["slug", "title", "displayTool"],
    query: {
      bool: {
        must: [
          { term: { isPublished: true } },
          { term: { source: "outils" } },
        ],
      },
    },
    size: 50,
    sort: [
      {
        order: "asc",
      },
    ],
  };
};

export const getTools = (
  ids?: string[],
  slug?: string,
  cdtnIds?: string[]
) => {
  const filter: any[] = [
    {
      bool: {
        must: [
          { term: { isPublished: true } },
          {
            bool: {
              should: [
                { term: { source: "external" } },
                { term: { source: "outils" } },
              ],
            },
          },
        ],
      },
    },
  ];
  if (ids) {
    filter.push({ ids: { values: ids } });
  }
  if (slug) {
    filter.push({ term: { slug: slug } });
  }
  if (cdtnIds) {
    filter.push({ terms: { cdtnId: cdtnIds } });
  }
  return {
    _source: [
      "action",
      "breadcrumbs",
      "cdtnId",
      "date",
      "description",
      "displayTool",
      "displayTitle",
      "icon",
      "id",
      "isPublished",
      "metaDescription",
      "metaTitle",
      "order",
      "slug",
      "source",
      "text",
      "title",
      "url",
    ],
    query: {
      bool: {
        filter,
      },
    },
    size: 200,
    sort: [
      {
        order: "asc",
      },
    ],
  };
};
