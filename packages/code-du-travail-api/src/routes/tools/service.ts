import elasticsearchClient from "../../conf/elasticsearch";
import { CDTN_ADMIN_VERSION } from "../v1.prefix";

const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

type ToolsFilterType = {
  ids?: string[];
  slugs?: string[];
};

export const getTools = async ({ ids, slugs }: ToolsFilterType) => {
  const filter: any[] = [
    { term: { isPublished: true } },
    { term: { source: "outils" } },
    { term: { source: "external" } },
  ];
  if (ids) {
    filter.push({ ids: { values: ids } });
  }
  if (slugs) {
    filter.push({ terms: { slug: slugs } });
  }
  const body = {
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
  return elasticsearchClient.search({ body, index });
};
