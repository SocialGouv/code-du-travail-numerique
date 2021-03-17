//

import fetch from "node-fetch";

import { stopwords } from "../dataset/stop_words";
// URL of the TF serve deployment

function stripAccents(text: string) {
  // strip accents
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function callTFServe(body: string): Promise<number[][]> {
  const NLP_URL =
    process.env.NLP_URL ??
    "https://preprod-serving-ml.dev2.fabrique.social.gouv.fr";

  const tfServeURL = NLP_URL + "/v1/models/sentqam:predict";

  const response = await fetch(tfServeURL, { body, method: "POST" });
  if (response.ok) {
    const json: { outputs: number[][] } = await response.json();
    return json.outputs;
  } else {
    throw new Error(response.statusText);
  }
}

export function preprocess(text: string): string {
  const stopWords = new Set(stopwords.map(stripAccents));

  const stripped = stripAccents(text);

  // 09/06/20 : cheap tokenizer, we should probably use something more solid
  // keep it like this for now to ensure embedding stability despite refactoring
  const split = stripped.split(" ");

  // remove stop words
  const noStopWords = split.filter((t) => !stopWords.has(t.toLowerCase()));

  return noStopWords.join(" ");
}

export async function vectorizeDocument(
  title: string,
  content: string
): Promise<number[]> {
  if (title === "") {
    throw new Error("Cannot vectorize document with empty title.");
  }

  const input = [preprocess(title)];
  const context = content ? [preprocess(content)] : "";

  const body = JSON.stringify({
    inputs: { context, input },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    signature_name: "response_encoder",
  });
  const vectors = await callTFServe(body);
  return vectors[0];
}

export async function vectorizeQuery(query: string): Promise<number[]> {
  if (!query) {
    throw new Error("Cannot vectorize empty query.");
  }

  const inputs = [preprocess(query)];
  const body = JSON.stringify({
    inputs,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    signature_name: "question_encoder",
  });
  const vectors = await callTFServe(body);
  return vectors[0];
}
