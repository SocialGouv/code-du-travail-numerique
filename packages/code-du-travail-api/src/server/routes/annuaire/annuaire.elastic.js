function getAnnuaireBody({ distance, coord }) {
  return {
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
  };
}

module.exports = getAnnuaireBody;
