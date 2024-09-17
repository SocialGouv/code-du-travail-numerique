import { SOURCES } from "@socialgouv/cdtn-utils";

export function getModeles() {
  return {
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

export function getModelesBySlugs(slugs: string[]) {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.LETTERS } },
          { term: { isPublished: true } },
          { terms: { slug: slugs } },
        ],
      },
    },
    size: 100,
  };
}

export function getModelesByIds(ids: string[]) {
  return {
    _source: [
      "title",
      "shortTitle",
      "description",
      "url",
      "slug",
      "breadcrumbs",
      "source",
      "cdtnId",
      "filesize",
      "filename",
      "html",
    ],
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.LETTERS } },
          { term: { isPublished: true } },
          { terms: { cdtnId: ids } },
        ],
      },
    },
    size: 100,
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
