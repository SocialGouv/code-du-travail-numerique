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
        ],
        should: [
          {
            match: {
              type: {
                query: "dirrecte",
                boost: 1.1
              }
            }
          },
          {
            match: {
              type: {
                query: "cicas",
                boost: 1
              }
            }
          },
          {
            match: {
              type: {
                query: "cidf",
                boost: 1
              }
            }
          },
          {
            match: {
              type: {
                query: "mjd",
                boost: 0.9
              }
            }
          },
          {
            match: {
              type: {
                query: "afpa",
                boost: 0.7
              }
            }
          },
          {
            match: {
              type: {
                query: "cci",
                boost: 0.7
              }
            }
          },
          {
            match: {
              type: {
                query: "chambre_agriculture",
                boost: 0.7
              }
            }
          },
          {
            match: {
              type: {
                query: "chambre_metier",
                boost: 0.7
              }
            }
          }
        ]
      }
    }
  };
}

module.exports = getAnnuaireBody;
