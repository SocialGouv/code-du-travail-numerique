import memoizee from "memoizee";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { getGlossaryBody } from "./queries";

async function getGlossaryData() {
  const body = getGlossaryBody();

  const response = await elasticsearchClient.search({
    body,
    index: elasticDocumentsIndex,
  });

  if (response.body.hits.total.value === 0) {
    throw new NotFoundError({
      message: `There is no glossary data`,
      cause: null,
      name: "GLOSSARY_NOT_FOUND",
    });
  }
  const glossaryData = response.body.hits.hits[0]._source.data;

  return glossaryData;
}

export const getGlossary = memoizee(getGlossaryData, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});
