"use strict";
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorizeQuery = exports.vectorizeDocument = exports.preprocess = void 0;
const stop_words_1 = require("../dataset/stop_words");
const node_fetch_1 = __importDefault(require("node-fetch"));
// URL of the TF serve deployment
function stripAccents(text) {
    // strip accents
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
async function callTFServe(body) {
    const NLP_URL = process.env.NLP_URL ??
        "https://preprod-serving-ml.dev2.fabrique.social.gouv.fr";
    const tfServeURL = NLP_URL + "/v1/models/sentqam:predict";
    const response = await node_fetch_1.default(tfServeURL, { body, method: "POST" });
    if (response.ok) {
        const json = await response.json();
        return json.outputs;
    }
    else {
        throw new Error(response.statusText);
    }
}
function preprocess(text) {
    const stopWords = new Set(stop_words_1.stopwords.map(stripAccents));
    const stripped = stripAccents(text);
    // 09/06/20 : cheap tokenizer, we should probably use something more solid
    // keep it like this for now to ensure embedding stability despite refactoring
    const split = stripped.split(" ");
    // remove stop words
    const noStopWords = split.filter((t) => !stopWords.has(t.toLowerCase()));
    return noStopWords.join(" ");
}
exports.preprocess = preprocess;
async function vectorizeDocument(title, content) {
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
exports.vectorizeDocument = vectorizeDocument;
async function vectorizeQuery(query) {
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
exports.vectorizeQuery = vectorizeQuery;
