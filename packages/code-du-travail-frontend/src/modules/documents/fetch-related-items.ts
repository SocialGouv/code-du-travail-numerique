import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

import { nonNullable } from "@socialgouv/modeles-social";
import { RelatedItem, sources } from "./type";
import {
  MAX_RELATED_ITEMS_ARTICLES,
  MAX_RELATED_ITEMS_MODELS_AND_TOOLS,
} from "../../config";

type RelatedItemSettings = {
  _id: string;
};

const getSearchBasedItems = async (settings: RelatedItemSettings) => {
  const relatedItemBody = getRelatedItemsBody([settings]);
  const { hits } = await elasticsearchClient.search<
    RelatedItem & { slug: string }
  >({
    ...relatedItemBody,
    _source: ["title", "source", "slug", "url"],
    index: elasticDocumentsIndex,
  });

  return hits.hits.map(({ _source }) => _source).filter(nonNullable);
};

const isArticleSource = (source) =>
  ![SOURCES.EXTERNALS, SOURCES.LETTERS, SOURCES.TOOLS].includes(source);

const getRelatedItemsBody = (
  settings: RelatedItemSettings[],
  size: number | undefined = 10
): any => {
  return {
    query: {
      bool: {
        filter: [
          { term: { excludeFromSearch: false } },
          { term: { isPublished: true } },
          {
            bool: {
              should: sources.map((source) => ({ term: { source } })),
            },
          },
        ],
        must: {
          more_like_this: {
            fields: ["title", "text"],
            like: settings,
            max_query_terms: 12,
            min_term_freq: 1,
          },
        },
      },
    },
    size,
  };
};

export const fetchRelatedItems = async (
  settings: RelatedItemSettings,
  excludedSlug: string
): Promise<{ items: RelatedItem[]; title: string }[]> => {
  const searchBasedItems = await getSearchBasedItems(settings);

  const filteredItems = searchBasedItems
    // avoid elements already visible within the item as fragments
    .filter(
      (item: { slug: string }) =>
        !excludedSlug.startsWith(item.slug.split("#")[0])
    )
    .reduce((acc, related) => {
      const key = related.source + related.slug;
      if (!acc.has(key)) acc.set(key, related);
      return acc;
    }, new Map())
    .values();

  const formatted: RelatedItem[] = Array.from(filteredItems).map((item) => ({
    url: `/${getRouteBySource(item.source)}/${item.slug}`,
    source: item.source,
    title: item.title,
  }));

  const relatedOtherItems = formatted
    .filter(({ source }) => !isArticleSource(source))
    .slice(0, MAX_RELATED_ITEMS_MODELS_AND_TOOLS);
  const relatedArticleItems = formatted
    .filter(({ source }) => isArticleSource(source))
    .slice(0, MAX_RELATED_ITEMS_ARTICLES);

  return [
    { items: relatedOtherItems, title: "Modèles et outils liés" },
    { items: relatedArticleItems, title: "Articles liés" },
  ];
};
