import { populateSuggestions } from "@cdtn/ingester";
import { Client } from "@elastic/elasticsearch";
import { deleteOldIndex } from "@socialgouv/cdtn-elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const SUGGEST_INDEX_NAME = process.env.SUGGEST_INDEX_NAME || "cdtn_suggestions";

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
