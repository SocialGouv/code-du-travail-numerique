const knownQueries = require("@cdt/data...datafiller/prequalified.data.json");

const { logger } = require("../../utils/logger");
const getEsReferences = require("./getEsReferences");

// find known query if any
const getSavedResult = async query => {
  const knownQuery =
    query.length > 5 &&
    knownQueries.find(q => q.variants && q.variants.includes(query.trim()));

  if (knownQuery && knownQuery.refs) {
    // get ES results for a known query
    logger.info(`getSavedResult: ${knownQuery.title}`);
    const refs = await getEsReferences(knownQuery.refs);
    return {
      hits: {
        hits: refs
      }
    };
  }
};

module.exports = getSavedResult;
