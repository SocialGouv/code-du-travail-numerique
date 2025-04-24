import {
  DocumentElasticWithSource,
  MailTemplateDoc,
} from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "../documents";

export const fetchModels = async <
  K extends keyof DocumentElasticWithSource<MailTemplateDoc>,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
  }
): Promise<Pick<DocumentElasticWithSource<MailTemplateDoc>, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.LETTERS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  const response = await elasticsearchClient.search<
    DocumentElasticWithSource<
      Pick<DocumentElasticWithSource<MailTemplateDoc>, K>
    >
  >({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size: 1000,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((model) => model !== undefined);
};

export const format = (model) => {
  if (model?.filesize) {
    model.filesize = Math.round((model.filesize / 1000) * 100) / 100;
  }
  if (model?.filename) {
    if (model.filename.indexOf(".") > 0) {
      model.extension = model.filename.split(/\.([a-z]{2,4})$/)[1];
    } else {
      throw new Error(
        `Missing extension from filename for model ${model?.title}`
      );
    }
  }

  return model;
};

export const fetchModel = async <
  K extends keyof DocumentElasticResult<
    DocumentElasticWithSource<MailTemplateDoc>
  >,
>(
  filter: {
    slug?: string;
    _id?: string;
  },
  fields: K[]
): Promise<
  | (DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>> & {
      extension: string;
    })
  | undefined
> => {
  const model = await fetchDocument<
    DocumentElasticWithSource<MailTemplateDoc>,
    keyof DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>>
  >(fields, {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.LETTERS } },
          { term: filter },
          { term: { isPublished: true } },
        ],
      },
    },
  });

  return format(model);
};

export type ModelDescription = Pick<
  DocumentElasticResult<DocumentElasticWithSource<MailTemplateDoc>>,
  "slug" | "title" | "description" | "breadcrumbs"
>;
export type ThemeModelDescription = {
  theme: string;
  modeles: ModelDescription[];
};
export type ModelDescriptionByRootTheme = ThemeModelDescription[];

export const formatByRootTheme = (
  models: ModelDescription[]
): ModelDescriptionByRootTheme => {
  const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce(
      (groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
      },
      {} as Record<K, T[]>
    );
  const data = groupBy(models, (model) => {
    return model.breadcrumbs && model.breadcrumbs.length > 0
      ? model.breadcrumbs[0].label
      : "Autre";
  });
  return Object.keys(data).map((theme) => ({
    theme,
    modeles: data[theme],
  }));
};
