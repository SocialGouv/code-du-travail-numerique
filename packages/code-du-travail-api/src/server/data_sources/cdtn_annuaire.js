const elasticsearchClient = require("../conf/elasticsearch.js");

const elasticsearchIndexName = "cdtn_annuaire";
const elasticsearchTypeName = "cdtn_annuaire";

// todo @lionelb move to constant file
const defaultMaxSearchDistance = "30km";
/**
 * Return a list of item matching the departement's code
 *
 * @returns {Object} An elasticsearch response.
 */
async function getItemsBydistance(params) {
  const { distance = defaultMaxSearchDistance, coord } = params;

  const query = {
    index: elasticsearchIndexName,
    type: elasticsearchTypeName,
    body: {
      query: {
        bool: {
          filter: [
            {
              geo_distance: {
                distance,
                coord
              }
            }
          ]
        }
      }
    }
  };

  return await elasticsearchClient.search(query);
}

module.exports = {
  getItemsBydistance
};
