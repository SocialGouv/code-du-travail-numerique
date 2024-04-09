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
      return infoA.title.localeCompare(infoB.title, "fr", {
        ignorePunctuation: true,
      });
    });
};
