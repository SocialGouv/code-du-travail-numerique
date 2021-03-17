import { Client } from "@elastic/elasticsearch";
import {
  createIndex,
  deleteOldIndex,
  indexDocumentsBatched,
  suggestionMapping,
} from "@socialgouv/cdtn-elasticsearch";
import fs from "fs";
import readline from "readline";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const SUGGEST_INDEX_NAME = process.env.SUGGEST_INDEX_NAME || "cdtn_suggestions";
const SUGGEST_FILE = process.env.SUGGEST_FILE || "./dataset/suggestions.txt";
const BUFFER_SIZE = process.env.BUFFER_SIZE || 20000;

async function pushSuggestions({ client, indexName, data }) {
  const mappedSuggestions = data.map((entity) => {
    return { ranking: entity.value, title: entity.entity };
  });

  await indexDocumentsBatched({
    client,
    documents: mappedSuggestions,
    indexName,
    size: BUFFER_SIZE,
  });
}

async function populateSuggestions(client, indexName) {
  await createIndex({
    client,
    indexName,
    mappings: suggestionMapping,
  });

  const promiseStream = new Promise((resolve) => {
    const stream = readline.createInterface({
      console: false,
      input: fs.createReadStream(SUGGEST_FILE),
    });

    let suggestionsBuffer = [];
    stream.on("line", async function (line) {
      // parse JSON representing a suggestion entity {entity: suggestion, value: weight}
      const entity = JSON.parse(line);
      suggestionsBuffer.push(entity);
      if (suggestionsBuffer.length >= BUFFER_SIZE) {
        // create an immutable copy of the array
        const suggestions = suggestionsBuffer.slice();
        suggestionsBuffer = [];
        await pushSuggestions({ client, data: suggestions, indexName });
      }
    });

    stream.on("close", async function () {
      if (suggestionsBuffer.length > 0) {
        await pushSuggestions({ client, data: suggestionsBuffer, indexName });
        resolve();
      }
    });
  });

  await promiseStream;
}

// utility function top reset suggestions in dev mode
async function resetSuggestions() {
  const client = new Client({
    node: `${ELASTICSEARCH_URL}`,
  });

  const ts = Date.now();
  const tmpIndexName = `${SUGGEST_INDEX_NAME}-${ts}`;

  await populateSuggestions(client, tmpIndexName);

  await client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            alias: `${SUGGEST_INDEX_NAME}`,
            index: `${SUGGEST_INDEX_NAME}-*`,
          },
        },
        {
          add: {
            alias: `${SUGGEST_INDEX_NAME}`,
            index: `${SUGGEST_INDEX_NAME}-${ts}`,
          },
        },
      ],
    },
  });

  await deleteOldIndex({
    client,
    patterns: [SUGGEST_INDEX_NAME],
    timestamp: ts,
  });
}

// case we run the script directly to reset the suggestions
if (module === require.main) {
  resetSuggestions();
}

export { populateSuggestions };
