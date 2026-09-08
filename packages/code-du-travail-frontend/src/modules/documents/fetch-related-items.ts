import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

import { nonNullable } from "@socialgouv/modeles-social";
import { LinkedContent, RelatedItem, sources } from "./type";
import {
  MAX_RELATED_ITEMS_ARTICLES,
  MAX_RELATED_ITEMS_MODELS_AND_TOOLS,
} from "../../config";

type RelatedItemSettings = {
  _id: string;
};

const getDenseKnnItems = async (settings: RelatedItemSettings) => {
  // get embeddings for the given id

  const doc = await elasticsearchClient.get<RelatedItem & { slug: string }>({
    index: elasticDocumentsIndex,
    id: settings._id,
  });
  const slug = doc._source?.slug;
  const embeddings = (doc._source as Record<string, any>)["embeddings"];
  // return [doc["_source"]["slug"], doc["_source"]["embeddings"]];

  const k = 10;
  // run knn query using dense vectors
  const { hits } = await elasticsearchClient.search<
    RelatedItem & { slug: string }
  >(
    // # query={"terms": {"metadata.source": sources}},
    {
      index: elasticDocumentsIndex,
      knn: {
        field: "embeddings",
        query_vector: embeddings,
        num_candidates: k * 10,
        k: k,
      },
      size: k,
      from: 1,
    }
  );

  return hits.hits.map(({ _source }) => _source).filter(nonNullable);
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

/*
def get_embeddings(doc_id):
    doc = es_connection.get(index=index_name, id=doc_id)
    return [doc['_source']['slug'], doc['_source']['embeddings']]            
    
def search_similar(doc_id, k=5):
    [slug, embeddings] = get_embeddings(doc_id)
    print(slug)
    res = es_connection.search(
            # query={"terms": {"metadata.source": sources}},           
            index=index_name,
            knn={
                "field": "embeddings",
                "query_vector": embeddings,
                "num_candidates": k * 10,
                "k": k,
            },
            source=['title', 'slug'],
            size=k+1,
        )
    #ignore first as it's the actual doc
    return res['hits']['hits'][1:]
  */

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

const getUrl = (item: LinkedContent): string =>
  item.source === SOURCES.EXTERNALS
    ? item.url!
    : `/${getRouteBySource(item.source)}/${item.slug}`;

export const formatRelatedItems = (
  items: LinkedContent[]
): { items: RelatedItem[]; title: string }[] => {
  const formatted: RelatedItem[] = items.map((item) => ({
    url: getUrl(item),
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
    { items: relatedOtherItems, title: "Modèles et simulateurs liés" },
    { items: relatedArticleItems, title: "Articles liés" },
  ];
};

export const fetchRelatedItems = async (
  settings: RelatedItemSettings,
  excludedSlug: string
): Promise<{ items: RelatedItem[]; title: string }[]> => {
  // const searchBasedItems = await getSearchBasedItems(settings);
  const searchBasedItems = await getDenseKnnItems(settings);

  const filteredItems: (RelatedItem & { slug: string })[] = Array.from(
    searchBasedItems
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
      .values()
  );

  return formatRelatedItems(filteredItems);
};
