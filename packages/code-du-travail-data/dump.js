import { vectorizeDocument } from "@socialgouv/cdtn-elasticsearch";
import { logger } from "@socialgouv/cdtn-logger";
import { SOURCES } from "@socialgouv/cdtn-sources";
import PQueue from "p-queue";
import retry from "p-retry";

import { cdtnDocumentsGen } from "./indexing/cdtnDocuments";
import { fetchCovisits } from "./indexing/monolog";

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
const nlpQueue = new PQueue({ concurrency: 5 });

const monologQueue = new PQueue({ concurrency: 20 });

async function fetchVector(data) {
  if (NLP_URL) {
    if (!data.title)
      console.error(`No title for document ${data.source} / ${data.slug}`);
    const title = data.title || "sans titre";
    await vectorizeDocument(title, data.text)
      .then((title_vector) => {
        if (title_vector.message) {
          throw new Error(`error fetching ${data.title}`);
        }
        data.title_vector = title_vector;
      })
      .catch((err) => {
        console.error(`error fetching ${data.title}`, err.message);
      });
  }

  return Promise.resolve(data);
}

const dump = async () => {
  let allDocuments = [];

  if (NLP_URL) {
    console.error(`Using NLP service to retrieve tf vectors on ${NLP_URL}`);
  } else {
    console.error(`NLP_URL not defined, semantic search will be disabled.`);
  }

  for await (const { source, documents } of cdtnDocumentsGen()) {
    console.error(
      `› dump ${documents.length} documents generated for ${source}`
    );
    if (documents.length === 0) {
      // skip if not docs
    } else {
      // add covisits using pQueue (there is a plan to change this : see #2915)
      const pDocs = documents.map((doc) =>
        monologQueue.add(() => fetchCovisits(doc))
      );
      const docs = await Promise.all(pDocs);
      await monologQueue.onIdle();
      // add NLP vectors
      if (excludeSources.includes(source)) {
        allDocuments = allDocuments.concat(docs);
      } else {
        const pDocs = docs.map((doc) =>
          nlpQueue.add(() => retry(() => fetchVector(doc), { retries: 3 }))
        );
        const docsWithData = await Promise.all(pDocs);
        await nlpQueue.onIdle();
        allDocuments = allDocuments.concat(docsWithData);
      }
    }
  }
  //eslint-disable-next-line no-console
  console.log(JSON.stringify(allDocuments, 0, 2));
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
};

dump().catch((error) => {
  console.error(error);
  console.error(`done in ${(Date.now() - t0) / 1000} s`);
  process.exit(1);
});
