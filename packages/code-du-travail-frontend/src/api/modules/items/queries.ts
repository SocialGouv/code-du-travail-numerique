import { ItemFilterType, ItemSortType } from "../../utils";

export const getSearchBySourceSlugBody = ({
  source,
  slug,
}: {
  source: any;
  slug: string;
}) => {
  return {
    _source: [
      "action", // outils
      "breadcrumbs",
      "categories", // thematic files
      "date",
      "dateDebut", // code-du-travail
      "description", // modele de courrier,
      "filesize", // modele de courrier, informations
      "fileUrl", // modele de courrier, informations
      "imgUrl",
      "intro",
      "html",
      "icon", // outils
      "id",
      "notaHtml",
      "metaDescription",
      "populars", // dossiers
      "sections", // dossiers
      "path", // code-du-travail
      "raw", // service-public
      "referencedTexts", // service-public, ministere-travail
      "slug", // outils
      "tags", // code-du-travail
      "title",
      "title_vector", // otherwise we can search for related items ?
      "url",
      "idcc",
      "date_publi", // convention-collective
      "answers", // contributions
      "refs", // thematic file
      "references",
      "contents", // editorial_content
      "folder", // editorial_content
      "cdtnId",
      "covisits",
      "source",
      "highlight", // convention-collective,
      "sectionDisplayMode",
      "dismissalProcess",
      "meta_title",
      "type",
    ],
    query: {
      bool: {
        filter: [
          { term: { source } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  };
};

export const getDocumentByIdsBody = (values: string[]) => {
  return {
    query: {
      bool: {
        should: [
          {
            ids: {
              type: "_doc",
              values,
            },
          },
        ],
      },
    },
    size: 10,
  };
};

export const getRelatedItemsBody = ({
  settings,
  size = 10,
  sources = [],
}: {
  settings: any;
  size?: number;
  sources: any[];
}): any => {
  return {
    _source: [
      "title",
      "source",
      "slug",
      "description",
      "url",
      "action",
      "icon",
      "cdtnId",
    ],
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

export const getDocumentBody = (
  { url, source, ids }: ItemFilterType,
  sortParam?: ItemSortType
) => {
  const filter: any[] = [{ term: { isPublished: true } }];
  const sort: any[] = [];
  if (sortParam) {
    sort.push({ [sortParam.fieldName]: sortParam.orderDirection });
  }
  if (url) {
    filter.push({ term: { url } });
  }
  if (source) {
    filter.push({ term: { source } });
  }
  if (ids) {
    filter.push({ ids: { values: ids } });
  }
  return {
    query: {
      bool: {
        filter,
      },
    },
    size: 200,
    sort,
  };
};
