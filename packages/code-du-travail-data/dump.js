import fetch from "node-fetch";
import { SOURCES } from "@cdt/sources";
import PQueue from "p-queue";
import retry from "p-retry";
import { cdtnDocumentsGen } from "./indexing/populate";
import { logger } from "./indexing/logger";

logger.silent = true;
const t0 = Date.now();
const NLP_URL = process.env.NLP_URL;
const excludeSources = [
  SOURCES.CDT,
  SOURCES.GLOSSARY,
  SOURCES.PREQUALIFIED,
  SOURCES.HIGHLIGHTS,
];
const queue = new PQueue({ concurrency: 3 });

function fetchVector(data) {
  return NLP_URL
    ? fetch(`${NLP_URL}/api/search?q=${escape(data.title)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.text || ""),
      })
        .then((res) => res.json())
        .then((title_vector) => {
          if (title_vector.message) {
            throw new Error(`error fetching ${data.title}`);
          }
          data.title_vector = title_vector;
          return data;
        })
        .catch((err) => {
          console.error(`error fetching ${data.title}`, err);
          throw err;
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
  for await (const docs of cdtnDocumentsGen()) {
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
