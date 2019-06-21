const DilaApiClient = require("dila-api-client");

const dilaApi = new DilaApiClient();

const fetchConvention = idcc =>
  dilaApi
    .fetchKaliConteneurByIdcc({ idcc, embedArticles: true })
    .then(conteneur => ({
      type: "idcc",
      data: {
        titre: conteneur.titre,
        id: idcc
      },
      children: dilaApi.expandChildren(conteneur)
    }));

if (require.main === module) {
  if (!process.argv[2]) {
    console.error("you need to pass an IDCC to the script");
    process.exit(1);
  }
  fetchConvention(process.argv[2]);
}

module.exports = fetchConvention;
