import { SOURCES } from "@socialgouv/cdtn-sources";
import PQueue from "p-queue";
import retry from "p-retry";

import { hashFunctionBuilder } from "./indexing/cdtnIds";
import { logger } from "./indexing/logger";
import { cdtnDocumentsGen } from "./indexing/populate";
import { vectorizeDocument } from "./indexing/vectorizer";

logger.silent = true;
const t0 = Date.now();

const NLP_URL = process.env.NLP_URL;
// these sources do not need NLP vectorization
const excludeSources = [
  SOURCES.CDT,
  SOURCES.GLOSSARY,
  SOURCES.PREQUALIFIED,
  SOURCES.HIGHLIGHTS,
  SOURCES.SHEET_MT_PAGE,
  SOURCES.CCN_PAGE,
];

const hashFunction = hashFunctionBuilder();
// these sources do not need unique CDTN id
const noIdSources = [
  SOURCES.HIGHLIGHTS,
  SOURCES.GLOSSARY,
  SOURCES.PREQUALIFIED,
  SOURCES.VERSIONS,
];

const queue = new PQueue({ concurrency: 3 });
async function fetchVector(data) {
  return NLP_URL
    ? vectorizeDocument(data.title, data.text)
        .then((title_vector) => {
          if (title_vector.message) {
            throw new Error(`error fetching ${data.title}`);
          }
          data.title_vector = title_vector;
          return data;
        })
        .catch((err) => {
          console.error(`error fetching ${data.title}`, err);
          return data;
        })
    : data;
}

const dump = async () => {
  let documents = [];
  if (NLP_URL) {
    console.error(`use ${NLP_URL} to retrieve tf vectors`);
  } else {
    console.error(`no nlp`);
  }
  for await (const docsNoIds of cdtnDocumentsGen()) {
    // add CDTN specific ids to docs
    const docs = docsNoIds.map((doc) => {
      if (!noIdSources.includes(doc.source)) {
        doc.cdtnId = hashFunction(doc);
      }
      return doc;
    });

    console.error(`› ${docs[0].source}... ${docs.length} items`);
    if (excludeSources.includes(docs[0].source)) {
      documents = documents.concat(docs);
    } else {
      const pDocs = docs.map((doc) =>
        queue.add(() => retry(() => fetchVector(doc), { retries: 3 }))
      );

      const docsWithData = await Promise.all(pDocs);
      documents = documents.concat(docsWithData);
    }
  }
  await queue.onIdle();
  //eslint-disable-next-line no-console
  console.log(JSON.stringify(documents, 0, 2));
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
};

dump().catch((error) => {
  console.error(error);
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
  process.exit(1);
});
