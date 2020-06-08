// URL the TF serve deployment
const NLP_HOST = process.env.NLP_HOST || "http://localhost:8501/";
const tfServeURL = NLP_HOST + "v1/models/sentqam:predict";
const fetch = require("node-fetch");

async function callTFServe(body) {
    const response = await fetch(tfServeURL, { method: "POST", body });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        throw new Error(response.statusText);
    }
}

async function vectorizeDocument(title, content) {
    const body = JSON.stringify({
        signature_name: "response_encoder",
        inputs: { input: [title], context: [content] },
    });
    const vectors = await callTFServe(body);
    return vectors[0];
}

async function vectorizeQuery(query) {
    const body = JSON.stringify({
        signature_name: "question_encoder",
        inputs: [query],
    });
    const vectors = await callTFServe(body);
    return vectors[0];
}

export { vectorizeDocument, vectorizeQuery };
