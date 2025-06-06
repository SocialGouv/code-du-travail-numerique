import memoizee from "memoizee";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getGlossaryBody } from "./queries";

async function getGlossaryData() {
  const body = getGlossaryBody();

  const response = await elasticsearchClient.search<any>({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    throw new NotFoundError({
      message: `There is no glossary data`,
      cause: null,
      name: "GLOSSARY_NOT_FOUND",
    });
  }
  return response.hits.hits[0]._source.data;
}

export const getGlossary = memoizee(getGlossaryData, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});
