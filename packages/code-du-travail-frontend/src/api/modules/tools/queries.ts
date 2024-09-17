import { Tool } from "@socialgouv/cdtn-types";

export const getAllToolsQuery = () => {
  return {
    query: {
      bool: {
        must: [
          {
            term: {
              isPublished: true,
            },
          },
          {
            term: {
              source: "outils",
            },
          },
          {
            term: {
              displayTool: true,
            },
          },
        ],
      },
    },
    size: 50,
    sort: [
      {
        order: {
          order: "asc",
        },
      },
    ],
  };
};

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
