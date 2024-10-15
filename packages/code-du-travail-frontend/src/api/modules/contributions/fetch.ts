import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getAllContributions } from "./queries";

export const fetchContributions = async () => {
  const body = getAllContributions();

  return await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });
};
