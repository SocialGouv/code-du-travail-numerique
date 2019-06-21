const axios = require("axios");
const slugify = require("slugify");

const fetchConventionsList = async () => {
  const url =
    "https://api.dila2sql.num.social.gouv.fr/v1/base/KALI/conteneurs?nature=IDCC&etat=VIGUEUR&etat=VIGUEUR_ETEN&etat=VIGUEUR_NON_ETEN&active=true";

  const response = await axios.get(url);
  console.log(
    `received ${
      response.data.length
    } conventions from api.dila2sql.num.social.gouv.fr`
  );
  const conteneurs = response.data.map(row => ({
    ...row,
    slug: slugify(`${row.num}-${row.titre}`.substring(0, 80), {
      lower: true
    }),
    url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${row.id}`
  }));
  return conteneurs;
};

module.exports = fetchConventionsList;
