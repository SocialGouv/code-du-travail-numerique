import {
  DocumentElasticWithSource,
  MailTemplateDoc,
} from "@socialgouv/cdtn-types";
import { ElasticSearchItem } from "../../types";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import {
  getModeleBySlug,
  getModeles,
  getModelesByIds,
  getModelesBySlugs,
} from "./queries";

export const getAllModeles = async <
  K extends keyof DocumentElasticWithSource<MailTemplateDoc>
>(
  fields: K[]
): Promise<Pick<DocumentElasticWithSource<MailTemplateDoc>, K>[]> => {
  const body = getModeles();
  const response = await elasticsearchClient.search<
    DocumentElasticWithSource<
      Pick<DocumentElasticWithSource<MailTemplateDoc>, K>
    >
  >({
    ...body,
    _source: fields,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};

export const getBySlugsModeles = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getModelesBySlugs(slugs);
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  return response.hits.hits.length > 0
    ? response.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getByIdsModeles = async (
  ids: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getModelesByIds(ids);
  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no modeles that match ${ids.join(", ")}`,
      name: "MODELE_NOT_FOUND",
      cause: null,
    });
  }
  return response.hits.hits.map(({ _source }) => _source);
};

export const getBySlugModeles = async (slug: string) => {
  const body = getModeleBySlug(slug);

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no modele that match ${slug}`,
      name: "MODELE_NOT_FOUND",
      cause: null,
    });
  }

  const theme = response.hits.hits[0];

  return {
    ...theme._source,
  };
};
