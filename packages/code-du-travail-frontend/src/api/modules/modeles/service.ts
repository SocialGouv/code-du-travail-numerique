import {
  DocumentElasticWithSource,
  MailTemplate,
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

export const getAllModeles = async () => {
  const body = getModeles();
  const response = await elasticsearchClient.search<
    DocumentElasticWithSource<MailTemplate>
  >({
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
