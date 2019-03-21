const { logger } = require("../utils/logger");
const fetch = require("node-fetch").default;

const NLP_API_URL = process.env.NLP_API_URL || "http://localhost:5000";

logger.info(`nlp-api at ${NLP_API_URL}`);

module.exports = async function quest2keys(query) {
  const response = await fetch(`${NLP_API_URL}/api/quest2keys?q=${query}`);
  const text = await response.text();
  return text;
};
