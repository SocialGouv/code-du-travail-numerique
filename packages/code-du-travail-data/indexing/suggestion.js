import readline from "readline";
import fs from "fs";

import { Client } from "@elastic/elasticsearch";
import { createIndex, indexDocumentsBatched } from "./es_client.utils";
import { suggestionMapping } from "./suggestion.mapping";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const SUGGEST_FILE = process.env.SUGGEST_FILE || "./dataset/suggestions.txt";
const BUFFER_SIZE = process.env.BUFFER_SIZE || 20000;

async function pushSuggestions({ client, indexName, data }) {
  const mappedSuggestions = data.map(entity => {
    return { title: entity.entity, ranking: entity.value };
  });

  await indexDocumentsBatched({
    client,
    indexName,
    documents: mappedSuggestions,
    size: BUFFER_SIZE
  });
}

async function populateSuggestions(client, indexName) {
  await createIndex({
    client,
    indexName,
    mappings: suggestionMapping
  });

  const promiseStream = new Promise(resolve => {
    const stream = readline.createInterface({
      input: fs.createReadStream(SUGGEST_FILE),
      console: false
    });

    let suggestionsBuffer = [];
    stream.on("line", async function(line) {
      // parse JSON representing a suggestion entity {entity: suggestion, value: weight}
      const entity = JSON.parse(line);
      suggestionsBuffer.push(entity);
      if (suggestionsBuffer.length >= BUFFER_SIZE) {
        // create an immutable copy of the array
        const suggestions = suggestionsBuffer.slice();
        suggestionsBuffer = [];
        await pushSuggestions({ client, indexName, data: suggestions });
      }
    });

    stream.on("close", async function() {
      if (suggestionsBuffer.length > 0) {
        await pushSuggestions({ client, indexName, data: suggestionsBuffer });
        resolve();
      }
    });
  });

  await promiseStream;
}

if (module === require.main) {
  /*
  const client = new Client({
    node: `${ELASTICSEARCH_URL}`
  });
  yarn dev:api
  const ts = Date.now()
  populateSuggestions(client, indexname...);
  // Alias move
  // deleteOldIndex()
  */
}

export { populateSuggestions };
