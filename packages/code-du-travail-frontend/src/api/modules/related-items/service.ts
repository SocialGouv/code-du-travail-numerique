import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getRelatedItemsBody } from "./queries";
import { RelatedItem } from "./type";
import { nonNullable } from "@socialgouv/modeles-social";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

export type RelatedItemSettings = {
  _id: string;
};

export const getSearchBasedItems = async (settings: RelatedItemSettings) => {
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

export const getRelatedItems = async (
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
    url: item.url ?? `/${getRouteBySource(item.source)}/${item.slug}`,
    source: item.source,
    title: item.title,
  }));

  const relatedOtherItems = formatted
    .filter(({ source }) => !isArticleSource(source))
    .slice(0, 2);
  const relatedArticleItems = formatted
    .filter(({ source }) => isArticleSource(source))
    .slice(0, 6);

  return [
    { items: relatedOtherItems, title: "Modèles et outils liés" },
    { items: relatedArticleItems, title: "Articles liés" },
  ];
};
