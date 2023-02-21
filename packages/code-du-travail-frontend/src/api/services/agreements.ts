import {
  Agreement,
  elasticIndex,
  elasticsearchClient,
  ElasticSearchItem,
  NotFoundError,
  SearchResponse,
} from "../utils";
import {
  getAgreementBySlugBody,
  getAgreementsBySlug,
  getAllAgreementsWithContributions,
} from "./queries";

export class AgreementsService {
  public async getAll(): Promise<Agreement[]> {
    const body = getAllAgreementsWithContributions();

    const response = await elasticsearchClient.search<
      SearchResponse<Agreement>
    >({
      body,
      index: elasticIndex,
    });

    return response.body.hits.hits
      .map(({ _source }) => _source)
      .sort(orderByAlphaAndMetalurgieLast);
  }

  public async getBySlugs(slugs: string[]): Promise<ElasticSearchItem[]> {
    const body = getAgreementsBySlug(slugs);
    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    return response.body.hits.total.value > 0
      ? response.body.hits.hits.map(({ _source }) => _source)
      : [];
  }

  public async getBySlug(slug: string) {
    const body = await getAgreementBySlugBody(slug);

    const response = await elasticsearchClient.search({
      body,
      index: elasticIndex,
    });
    if (response.body.hits.total.value === 0) {
      throw new NotFoundError({
        message: `Agreement not found, no agreement match ${slug}y`,
        name: "AGREEMENT_NOT_FOUND",
        cause: null,
      });
    }

    return { ...response.body.hits.hits[0]._source };
  }
}

const orderByAlphaAndMetalurgieLast = (a, b) => {
  if (a.url && !b.url) {
    return -1;
  }
  if (!a.url && b.url) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }

  return 0;
};
