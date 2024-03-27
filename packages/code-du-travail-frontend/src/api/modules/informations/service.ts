import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { fetchInformations } from "./queries";

export const getAllInformations = async () => {
  const body = fetchInformations();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
  return response.body.hits.hits
    .map(({ _source }) => _source)
    .sort((infoA, infoB) => {
      if (infoA.title < infoB.title) return -1;
      if (infoA.title > infoB.title) return 1;
      return 0;
    });
};
