// import { PIWIK_SITE_ID, PIWIK_URL } from "../../../config";
import {
  elasticsearchClient,
  elasticDocumentsIndex,
  NotFoundError,
} from "../../utils";
import { getDocsCountQuery } from "./queries";

export const getStatsService = async () => {
  const body: any = getDocsCountQuery();
  const refYear = 2020;
  const now = new Date();
  const currentYear = now.getFullYear();
  const numberLoop = currentYear - refYear + 1;
  const PIWIK_URL = "https://matomo.fabrique.social.gouv.fr";
  const PIWIK_SITE_ID = "4";

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

  const generateUrlVisit = (index: number) => {
    return `${PIWIK_URL}/?module=API&method=VisitsSummary.getVisits&idSite=${PIWIK_SITE_ID}&format=JSON&period=range&date=${
      refYear + index
    }-01-01,${refYear + index + 1}-01-01`;
  };

  const generateUrlAction = (index: number) => {
    return `${PIWIK_URL}/?module=API&method=Actions.get&idSite=${PIWIK_SITE_ID}&format=JSON&period=range&date=${
      refYear + index
    }-01-01,${refYear + index + 1}-01-01`;
  };

  const visitsPromises = Array.from(Array(numberLoop).keys()).map((index) => {
    const url = generateUrlVisit(index);
    return fetch(url)
      .then(async (data: Response) => data.json())
      .catch((e: Error) => {
        console.error(e);
        return null;
      });
  });

  const nbVisitDatas = await Promise.all(visitsPromises);
  const nbVisitData = nbVisitDatas.reduce(
    (obj, item) => {
      return {
        nbVisits: obj.nbVisits + (item.value ?? 0),
      };
    },
    { nbVisits: 0 }
  );

  const actionsPromises = Array.from(Array(numberLoop).keys()).map((index) => {
    const url = generateUrlAction(index);
    return fetch(url)
      .then(async (data: Response) => data.json())
      .catch((e: Error) => {
        console.error(e);
        return null;
      });
  });

  const infoDatas = await Promise.all(actionsPromises);
  const infoData = infoDatas.reduce(
    (obj, item) => {
      return {
        nbPageViews: obj.nbPageViews + (item.nb_pageviews ?? 0),
        nbSearches: obj.nbSearches + (item.nb_searches ?? 0),
      };
    },
    { nbPageViews: 0, nbSearches: 0 }
  );

  if (!nbVisitData && !infoData) {
    throw new NotFoundError({
      cause: null,
      message: "No visit data and info data",
      name: "STATS_NOT_FOUND",
    });
  }

  const result = {
    nbDocuments,
    nbPageViews: infoData.nbPageViews,
    nbSearches: infoData.nbSearches,
    nbVisits: nbVisitData.nbVisits,
  };

  console.log(result);
  return result;
};
