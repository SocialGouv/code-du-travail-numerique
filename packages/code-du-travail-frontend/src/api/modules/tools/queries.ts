const TOOL_FILTER = {
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
};

export const getAllToolsQuery = () => {
  const filter: any[] = [TOOL_FILTER];

  return {
    _source: ["slug", "title", "displayTool"],
    query: {
      bool: {
        filter,
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
  slugs?: string[],
  cdtnIds?: string[]
) => {
  const filter: any[] = [TOOL_FILTER];
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
    _source: [
      "action",
      "breadcrumbs",
      "cdtnId",
      "date",
      "description",
      "displayTool",
      "icon",
      "id",
      "isPublished",
      "metaDescription",
      "order",
      "slug",
      "source",
      "text",
      "title",
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
