const axios = require('axios');
const slugify = require('slugify');

if (module === require.main) {
  const url = "https://api.dila2sql.num.social.gouv.fr/v1/base/KALI/conteneurs?nature=IDCC&etat=VIGUEUR&etat=VIGUEUR_ETEN&etat=VIGUEUR_NON_ETEN&active=true";
  axios.get(url)
    .then(function (response) {
      const rows = response.data.map(row => ({
        ...row,
        slug: slugify(`${row.num}-${row.titre}`.substring(0, 80), { lower: true}),
        url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${row.id}`,
        // pdf: `https://www.legifrance.gouv.fr/download_code_pdf.do?pdf=${row.id}&cidTexte=${row.id}`
        // the pdf url calls it a cid but actually uses the text id
        // the pdf is actually generated for the base texte, so it makes little sense
        // to have it at this level.
      }))
      console.log(JSON.stringify(rows, null, 2));
    })
}
