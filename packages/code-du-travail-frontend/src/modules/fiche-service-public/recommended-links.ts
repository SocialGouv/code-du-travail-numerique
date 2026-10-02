import {
  getLabelBySource,
  getRouteBySource,
  labelBySource,
  routeBySource,
} from "@socialgouv/cdtn-utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { fetchExploreThemesBySlugs } from "../contributions/explore-themes/queries";
import { ExploreTheme } from "../contributions/explore-themes/type";
import { ElasticFicheServicePublic, RecommendedLink } from "./queries";
import { getRecommendedItemKey, RecommendedItem } from "./types";

const MAX_LINKS = 4;

// `/themes/<parent>#<sous-theme>` : le sous-thème est l'ancre, ou le dernier
// segment pour un thème de premier niveau.
const getThemeSlugFromBreadcrumb = (slug: string): string =>
  slug.split("#")[1] ?? slug.replace(/^\/?themes\//, "");

const getThemeSlug = (link: RecommendedLink): string | undefined => {
  switch (link.type) {
    case "l2":
      return link.l2;
    case "document":
      return undefined;
  }
};

const getDocumentId = (link: RecommendedLink): string | undefined => {
  switch (link.type) {
    case "document":
      return link.cdtnId;
    case "l2":
      return undefined;
  }
};

type LinkedDocument = {
  cdtnId: string;
  source: string;
  slug: string;
  title: string;
};

// Les liens sont figés à l'export : on relit les documents pour écarter ceux
// dépubliés depuis et afficher leur titre à jour.
const fetchPublishedDocumentsByIds = async (
  cdtnIds: string[]
): Promise<Map<string, LinkedDocument>> => {
  if (cdtnIds.length === 0) return new Map();

  const response = await elasticsearchClient.search<LinkedDocument>({
    index: elasticDocumentsIndex,
    _source: ["cdtnId", "source", "slug", "title"],
    query: {
      bool: {
        filter: [
          { terms: { cdtnId: cdtnIds } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: cdtnIds.length,
  });

  return new Map(
    response.hits.hits
      .map(({ _source }) => _source)
      .filter((doc): doc is LinkedDocument => !!doc)
      .map((doc) => [doc.cdtnId, doc])
  );
};

const toDocumentItem = (doc: LinkedDocument | undefined): RecommendedItem[] => {
  if (!doc) return [];
  const route = getRouteBySource(doc.source as keyof typeof routeBySource);
  // Source inconnue : pas de page vers laquelle pointer.
  if (!route) return [];
  return [
    {
      type: "document",
      url: `/${route}/${doc.slug}`,
      title: doc.title,
      desc: getLabelBySource(doc.source as keyof typeof labelBySource),
    },
  ];
};

/**
 * Les liens recommandés d'une fiche : son thème de rattachement (dernier
 * maillon du fil d'Ariane) en premier, puis les liens par ordre de rang. Les
 * thèmes sont résolus comme les cartes « Explorez nos thématiques » des
 * contributions, les documents relus dans l'index ; un thème ou un document
 * qui ne se résout pas (introuvable, dépublié, sans contenu) est écarté.
 */
export const fetchFicheSPRecommendedLinks = async (
  breadcrumbs: ElasticFicheServicePublic["breadcrumbs"],
  links: RecommendedLink[] = []
): Promise<RecommendedItem[]> => {
  const currentTheme = breadcrumbs[breadcrumbs.length - 1];
  const sortedLinks = [...links].sort((a, b) => a.rank - b.rank);

  const themeSlugs = [
    ...(currentTheme ? [getThemeSlugFromBreadcrumb(currentTheme.slug)] : []),
    ...sortedLinks.map(getThemeSlug).filter((slug) => slug !== undefined),
  ];
  const documentIds = sortedLinks
    .map(getDocumentId)
    .filter((id) => id !== undefined);
  const [themes, documents] = await Promise.all([
    fetchExploreThemesBySlugs([...new Set(themeSlugs)]),
    fetchPublishedDocumentsByIds([...new Set(documentIds)]),
  ]);
  const toThemeItem = (theme: ExploreTheme | undefined) =>
    theme ? [{ type: "theme" as const, theme }] : [];

  const items: RecommendedItem[] = [
    ...(currentTheme
      ? toThemeItem(themes.get(getThemeSlugFromBreadcrumb(currentTheme.slug)))
      : []),
    ...sortedLinks.flatMap((link) => {
      switch (link.type) {
        case "l2":
          return toThemeItem(themes.get(link.l2));
        case "document":
          return toDocumentItem(documents.get(link.cdtnId));
      }
    }),
  ];

  return items
    .filter(
      (item, index) =>
        items.findIndex(
          (other) =>
            getRecommendedItemKey(other) === getRecommendedItemKey(item)
        ) === index
    )
    .slice(0, MAX_LINKS);
};
