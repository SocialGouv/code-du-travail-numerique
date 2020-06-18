import fetch from "node-fetch";
import semantic_stopwords from "../dataset/stop_words";

// URL of the TF serve deployment
const NLP_URL = process.env.NLP_URL || "http://localhost:8501/";
const tfServeURL = NLP_URL + "v1/models/sentqam:predict";

function stripAccents(text) {
  // strip accents
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const stopWords = new Set(semantic_stopwords.map(stripAccents));

function preprocess(text) {
  const stripped = stripAccents(text);

  // 09/06/20 : cheap tokenizer, we should probably use something more solid
  // keep it like this for now to ensure embedding stability despite refactoring
  const split = stripped.split(" ");

  // remove stop words
  const noStopWords = split.filter((t) => !stopWords.has(t.toLowerCase()));

  return noStopWords.join(" ");
}

async function callTFServe(body) {
  console.log(tfServeURL);
  console.log(body);

  const response = await fetch(tfServeURL, { method: "POST", body });
  if (response.ok) {
    const json = await response.json();
    return json["outputs"];
  } else {
    throw new Error(response.statusText);
  }
}

async function vectorizeDocument(title, content) {
  if (title == undefined || title == "") {
    throw new Error("Cannot vectorize document with empty title.");
  }

  const input = [preprocess(title)];
  const context = content ? [preprocess(content)] : "";

  const body = JSON.stringify({
    signature_name: "response_encoder",
    inputs: { input, context },
  });
  const vectors = await callTFServe(body);
  return vectors[0];
}

async function vectorizeQuery(query) {
  if (!query) {
    throw new Error("Cannot vectorize empty query.");
  }

  const inputs = [preprocess(query)];
  const body = JSON.stringify({
    signature_name: "question_encoder",
    inputs,
  });
  const vectors = await callTFServe(body);
  return vectors[0];
}

export { vectorizeDocument, vectorizeQuery, preprocess };
