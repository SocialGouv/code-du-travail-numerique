// read the file
// create and  configure  index
// ingest suggestions
// setup test suite

// add to API

// export a function populate_suggestion()

import readline from "readline";
import fs from "fs";

import { Client } from "@elastic/elasticsearch";
import {
  createIndex,
  indexDocumentsBatched,
  deleteOldIndex
} from "./es_client.utils";
import { suggestionMapping } from "./suggestion.mapping";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const SUGGEST_FILE = process.env.SUGGEST_FILE || "./data/suggest.txt";
const SUGGEST_INDEX_NAME = process.env.SUGGEST_INDEX_NAME || "cdtn_suggestions";
const BUFFER_SIZE = process.env.BUFFER_SIZE || 20000;

function mapSuggestion(title, ranking) {
  return { title, ranking };
}

async function pushSuggestions({ client, indexName, data }) {
  const mappedSuggestions = data.map(([title, weight]) =>
    mapSuggestion(title, weight)
  );

  await indexDocumentsBatched({
    client,
    indexName,
    documents: mappedSuggestions,
    size: BUFFER_SIZE
  });
}

async function populate_suggestions(client) {
  // index Creation
  // ingest
  // rename index / alias
  // clean oldIndex
  const ts = Date.now();
  const indexName = `${SUGGEST_INDEX_NAME}-${ts}`;

  await createIndex({
    client,
    indexName,
    mappings: suggestionMapping
  });

  const promiseStream = new Promise(resolve => {
    const stream = readline.createInterface({
      input: fs.createReadStream(SUGGEST_FILE),
      //output: process.stdout,
      console: false
    });

    let allSuggestions = [];
    stream.on("line", async function(line) {
      // todo replace by json parse
      // File contains this entries
      // abondon@@@2
      // abondons@@@2
      // abonnement@@@2
      const word_count = line.split("@@@");
      allSuggestions.push(word_count);
      if (allSuggestions.length >= BUFFER_SIZE) {
        // create a copy of the array
        const suggestions = allSuggestions.slice();
        allSuggestions = [];
        await pushSuggestions({ client, indexName, data: suggestions });
      }
    });

    stream.on("close", async function() {
      if (allSuggestions.length > 0) {
        await pushSuggestions({ client, indexName, data: allSuggestions });
        resolve();
      }
    });
  });

  await promiseStream;

  const patterns = [SUGGEST_INDEX_NAME];
  await deleteOldIndex({ client, patterns, timestamp: ts });
}

if (module === require.main) {
  const client = new Client({
    node: `${ELASTICSEARCH_URL}`
  });
  populate_suggestions(client);
}

const populate_suggestion_debug = client =>
  populate_suggestions(client).catch(error => {
    console.error(error);
  });

export { populate_suggestion_debug as populate_suggestions };
