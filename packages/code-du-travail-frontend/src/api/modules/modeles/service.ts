import { ElasticSearchItem } from "@socialgouv/cdtn-utils";
import { elasticsearchClient, elasticIndex, NotFoundError } from "../../utils";
import {
  getModeles,
  getModelesBySlugs,
  getModeleBySlug,
  getModelesByIds,
} from "./queries";

export const getAllModeles = async () => {
  const body = getModeles();
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugsModeles = async (
  slugs: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getModelesBySlugs(slugs);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getByIdsModeles = async (
  ids: string[]
): Promise<ElasticSearchItem[]> => {
  const body = getModelesByIds(ids);
  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });
  return response.body.hits.total.value > 0
    ? response.body.hits.hits.map(({ _source }) => _source)
    : [];
};

export const getBySlugModeles = async (slug: string) => {
  const body = getModeleBySlug(slug);

  const response = await elasticsearchClient.search({
    body,
    index: elasticIndex,
  });

  if (response.body.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no modele that match ${slug}`,
      name: "MODELE_NOT_FOUND",
      cause: null,
    });
  }

  const theme = response.body.hits.hits[0];

  return {
    ...theme._source,
  };
};
