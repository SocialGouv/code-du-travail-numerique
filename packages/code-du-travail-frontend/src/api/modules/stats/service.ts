import { PIWIK_SITE_ID, PIWIK_URL } from "../../../config";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getDocsCountQuery } from "./queries";

export const getStatsService = async () => {
  const body: any = getDocsCountQuery();

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  const aggregations: any = response.aggregations;

  let nbDocuments = 0;

  const { buckets = [] } = aggregations.sources;

  for (const { doc_count } of buckets) {
    nbDocuments += doc_count;
  }

  const URLS = [
    `${PIWIK_URL}/?module=API&method=VisitsSummary.getVisits&idSite=${PIWIK_SITE_ID}&format=JSON&period=range&date=2020-01-01,today`,
    `${PIWIK_URL}/?module=API&method=Actions.get&idSite=${PIWIK_SITE_ID}&format=JSON&period=range&date=2020-01-01,today`,
  ];

  const promises = URLS.map((url) =>
    fetch(url)
      .then(async (data: Response) => data.json())
      .catch((e: Error) => {
        console.error(e);
        return null;
      })
  );
  const [nbVisitData, infoData] = await Promise.all(promises);

  if (!nbVisitData && !infoData) {
    throw new NotFoundError({
      cause: null,
      message: "No visit data and info data",
      name: "STATS_NOT_FOUND",
    });
  }

  return {
    nbDocuments,
    nbPageViews: infoData.nb_pageviews,
    nbSearches: infoData.nb_searches,
    nbVisits: nbVisitData.value,
  };
};
