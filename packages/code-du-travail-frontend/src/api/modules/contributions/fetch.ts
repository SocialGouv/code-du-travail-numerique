import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAllContributions } from "./queries";

export const fetchAllContributions = async () => {
  const body = getAllContributions();

  return await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });
};
