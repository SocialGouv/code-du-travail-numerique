import { orderByAlpha } from "../utils";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { EditorialContentElasticDocument, KeysToCamelCase } from "./type";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  RelatedItem,
  Source,
} from "../documents";
import {
  ContentItem,
  GraphicContentPart,
} from "@socialgouv/cdtn-types/build/hasura/editorial-content";

export const fetchAllInformations = async <
  K extends keyof EditorialContentElasticDocument,
>(
  fields: K[],
  sortBy?: K
): Promise<Pick<EditorialContentElasticDocument, K>[]> => {
  const response = await elasticsearchClient.search<
    Pick<EditorialContentElasticDocument, K>
  >({
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.EDITORIAL_CONTENT } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  const data = response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
  if (sortBy) {
    return data.sort((a, b) => orderByAlpha(a, b, sortBy));
  }
  return data;
};

export const fetchInformation = async <
  K extends keyof EditorialContentElasticDocument,
>(
  slug: string,
  fields: K[]
): Promise<
  DocumentElasticResult<Pick<EditorialContentElasticDocument, K>> | undefined
> => {
  const response = await fetchDocument<
    EditorialContentElasticDocument,
    keyof DocumentElasticResult<EditorialContentElasticDocument>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.EDITORIAL_CONTENT } },
          { term: { isPublished: true } },
          { term: { slug } },
        ],
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response;
};

export type InformationData = DocumentElasticResult<
  Pick<
    EditorialContentElasticDocument,
    | "date"
    | "breadcrumbs"
    | "title"
    | "description"
    | "intro"
    | "contents"
    | "references"
    | "dismissalProcess"
  >
> & {
  infography?: KeysToCamelCase<GraphicContentPart>;
};

export type FormatType = {
  information: InformationData;
  relatedItems: { items: RelatedItem[]; title: string }[];
};

export const format = (
  information: InformationData | undefined
): FormatType | undefined => {
  if (!information) return;
  if (information.dismissalProcess) {
    const { contents, ...data } = information;
    return {
      information: {
        ...data,
        contents: formatParts(contents),
        infography: formatInfography(contents),
      },
      relatedItems: formatRelatedItems(extractRelatedItems(contents)),
    };
  } else {
    return {
      information,
      relatedItems: [],
    };
  }
};

const formatParts = (
  parts: EditorialContentElasticDocument["contents"]
): EditorialContentElasticDocument["contents"] => {
  if (parts && parts.length > 0) {
    const infoPart = parts[0];
    return [
      {
        ...infoPart,
        title: "La procédure",
        blocks: infoPart.blocks.filter((item) => item.type === "graphic"),
      },
    ];
  }
  return parts;
};

const formatInfography = (
  parts: EditorialContentElasticDocument["contents"]
): KeysToCamelCase<GraphicContentPart> | undefined => {
  if (parts && parts.length > 0) {
    const infoPart = parts[0];
    const infographies = infoPart.blocks.filter(
      (item) => item.type === "graphic"
    );
    return infographies.length > 0 ? infographies[0] : undefined;
  }
  return undefined;
};

const formatRelatedItems = (
  items: KeysToCamelCase<ContentItem>[]
): FormatType["relatedItems"] => {
  const result: FormatType["relatedItems"] = [];
  const toolsAndModels = items.filter(
    (item) => item.source === SOURCES.TOOLS || item.source === SOURCES.LETTERS
  );
  if (toolsAndModels.length > 0) {
    result.push({
      title: "Modèles et simulateurs liés",
      items: toolsAndModels
        .map((item) => ({
          title: item.title,
          source: item.source as Source,
          slug: item.slug,
          url: getUrl(item),
        }))
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.url === item.url)
        ),
    });
  }
  const articles = items.filter(
    (item) => item.source != SOURCES.TOOLS && item.source != SOURCES.LETTERS
  );
  if (toolsAndModels.length > 0) {
    result.push({
      title: "Articles liées",
      items: articles
        .map((item) => ({
          title: item.title,
          source: item.source as Source,
          slug: item.slug,
          url: getUrl(item),
        }))
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.url === item.url)
        ),
    });
  }
  return result;
};

const getUrl = (item: KeysToCamelCase<ContentItem>): string =>
  `/${getRouteBySource(item.source as Source)}/${item.slug}`;

const extractRelatedItems = (
  parts: EditorialContentElasticDocument["contents"]
): KeysToCamelCase<ContentItem>[] => {
  return parts.flatMap((part) => {
    return part.blocks.flatMap((item) => {
      if (item.type === "content") {
        return item.contents;
      }
      return [];
    });
  });
};
