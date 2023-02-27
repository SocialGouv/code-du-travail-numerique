export const getTools = (
  ids?: string[],
  slugs?: string[],
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
  if (slugs) {
    filter.push({ terms: { slug: slugs } });
  }
  if (cdtnIds) {
    filter.push({ terms: { cdtnId: cdtnIds } });
  }
  return {
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

export const getToolBySlug = async (slug: string) => {
  const filter = [
    {
      bool: {
        must: [
          { term: { isPublished: true } },
          { term: { source: "outils" } },
          { term: { slug } },
        ],
      },
    },
  ];
  return {
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
