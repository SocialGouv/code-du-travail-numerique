const axios = require("axios");
const slugify = require("slugify");
const titresCourts = require("./idcc_titres_courts.json");

if (module === require.main) {
  const url =
    "https://api.dila2sql.num.social.gouv.fr/v1/base/KALI/conteneurs?nature=IDCC&etat=VIGUEUR&etat=VIGUEUR_ETEN&etat=VIGUEUR_NON_ETEN&active=true";
  axios.get(url).then(function(response) {
    const rows = response.data.map(row => {
      const titreCourt = titresCourts[row["num"]] || null;
      // forcing null because undefined is not dumped to json
      return {
        ...row,
        titre_court: titreCourt,
        slug: slugify(`${row.num}-${row.titre}`.substring(0, 80), {
          lower: true
        }),
        url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${
          row.id
        }`
      };
    });
    console.log(JSON.stringify(rows, null, 2));
  });
}
