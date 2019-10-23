import { Client } from "@elastic/elasticsearch";
import path from "path";
import { createIndex, indexDocumentsBatched } from "./indexing/es_client.utils";

import readline from "readline";
import fs from "fs";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const client = new Client({
  node: `${ELASTICSEARCH_URL}`
});

export const suggestionMapping = {
  properties: {
    suggest: {
      type: "completion",
      analyzer: "suggest_ana"
    },
    sayt: {
      type: "search_as_you_type"
    },
    title: {
      type: "keyword"
    },

    ranking: {
      type: "rank_feature"
    },

    autocomp: {
      type: "text",
      analyzer: "autocomplete",
      search_analyzer: "autocomplete_search",
      fields: {
        text_prefix: {
          type: "text",
          analyzer: "text_prefix"
        }
      }
    }
  }
};

function mapSuggestion(title, weight) {
  return {
    suggest: { input: title, weight },
    title,
    sayt: title,
    ranking: weight,
    autocomp: title
  };
}

const indexName = "suggestions-index";

async function main() {
  const dumpPath =
    "/Users/remim/dev/cdtn/cdtn-suggester/src/main/resources/entities";

  const stream = readline.createInterface({
    input: fs.createReadStream(path.join(dumpPath, "data.txt")),
    //output: process.stdout,
    console: false
  });

  const allSuggestions = [];
  stream.on("line", function(line) {
    const words = line.split(" ");

    if (words.length <= 4 && words[0].length > 4) {
      allSuggestions.push(words.join(" "));
      //console.log(words[0]);
    }
  });

  stream.on("close", async function() {
    //const filteredSuggestions = [...new Set(allSuggestions)];

    const suggestionMap = allSuggestions.reduce((state, item) => {
      if (!state[item]) {
        state[item] = 0;
      }
      state[item] += 1;
      return state;
    }, {});

    /*
    Object.entries(suggestionMap).forEach(([key, value]) =>
      console.log(key + "@@@" + value)
    );

    */

    //filteredSuggestions.forEach(a => console.log(a));
    await createIndex({
      client,
      indexName: indexName,
      mappings: suggestionMapping
    });

    const mappedSuggestions = Object.entries(suggestionMap).map(
      ([key, value]) => mapSuggestion(key, value)
    );

    await indexDocumentsBatched({
      client,
      indexName,
      documents: mappedSuggestions,
      size: 20000
    });
  });
}

main();
