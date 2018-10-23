const elasticsearchClient = require("../conf/elasticsearch.js");

const elasticsearchIndexName = "cdtn_annuaire";
const elasticsearchTypeName = "cdtn_annuaire";

/**
 * Return a list of item matching the departement's code
 *
 * @returns {Object} An elasticsearch response.
 */
async function getItemsByTypeForDepartement(params) {
  const { distance = "30km", coord } = params;

  let query = {
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
  getItemsByTypeForDepartement
};
