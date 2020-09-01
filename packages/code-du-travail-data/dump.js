import { SOURCES } from "@socialgouv/cdtn-sources";
import PQueue from "p-queue";
import retry from "p-retry";

import { hashFunctionBuilder } from "./indexing/cdtnIds";
import { logger } from "./indexing/logger";
import { fetchCovisits } from "./indexing/monolog";
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
  SOURCES.VERSIONS,
];
const nlpQueue = new PQueue({ concurrency: 3 });

const monologQueue = new PQueue({ concurrency: 20 });

const hashFunction = hashFunctionBuilder();
// these sources do not need unique CDTN id
const noIdSources = [
  SOURCES.HIGHLIGHTS,
  SOURCES.GLOSSARY,
  SOURCES.PREQUALIFIED,
  SOURCES.VERSIONS,
];

async function fetchVector(data) {
  // ensure title_vector set, otherwise search will fail if any of the docs does not have title_vector
  data.title_vector = Array(512).fill(0);
  return NLP_URL && data.title && data.text
    ? vectorizeDocument(data.title, data.text)
        .then((title_vector) => {
          if (title_vector.message) {
            throw new Error(`error fetching ${data.title}`);
          }
          data.title_vector = title_vector;
          return data;
        })
        .catch((err) => {
          console.error(`error fetching ${data.title}`, err.message);
          return data;
        })
    : data;
}

const dump = async () => {
  let documents = [];

  if (NLP_URL) {
    console.error(`Using NLP service to retrieve tf vectors on ${NLP_URL}`);
  } else {
    console.error(`NLP_URL not defined, semantic search will be disabled.`);
  }

  for await (const docsNoIds of cdtnDocumentsGen()) {
    console.error(`› ${docsNoIds[0].source}... ${docsNoIds.length} items`);

    // add CDTN specific ids to docs
    const docsIds = docsNoIds.map((doc) => {
      if (!noIdSources.includes(doc.source)) {
        doc.cdtnId = hashFunction(doc);
      }
      return doc;
    });

    // add covisits using pQueue (there is a plan to change this : see #2915)
    const pDocs = docsIds.map((doc) =>
      monologQueue.add(() => fetchCovisits(doc))
    );
    const docs = await Promise.all(pDocs);
    await monologQueue.onIdle();

    // add NLP vectors
    if (excludeSources.includes(docs[0].source)) {
      documents = documents.concat(docs);
    } else {
      const pDocs = docs.map((doc) =>
        nlpQueue.add(() => retry(() => fetchVector(doc), { retries: 3 }))
      );

      const docsWithData = await Promise.all(pDocs);
      documents = documents.concat(docsWithData);
    }
  }
  await nlpQueue.onIdle();
  //eslint-disable-next-line no-console
  console.log(JSON.stringify(documents, 0, 2));
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
};

dump().catch((error) => {
  console.error(error);
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
  process.exit(1);
});
